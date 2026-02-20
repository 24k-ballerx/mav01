from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from core.permissions import IsAdmin, IsTeacher, IsAdminOrTeacher
from .models import Subject, SchoolClass, StudentProfile, Result
from .serializers import SubjectSerializer, SchoolClassSerializer, StudentProfileSerializer, ResultSerializer
from .grading import calculate_gpa
from .utils import export_result_pdf
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from django.db.models import Avg, Count
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
import csv
from django.http import StreamingHttpResponse

class SubjectViewSet(viewsets.ModelViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer
    permission_classes = [IsAuthenticated, IsAdminOrTeacher]

class SchoolClassViewSet(viewsets.ModelViewSet):
    queryset = SchoolClass.objects.all()
    serializer_class = SchoolClassSerializer
    permission_classes = [IsAuthenticated, IsAdminOrTeacher]

class StudentProfileViewSet(viewsets.ModelViewSet):
    queryset = StudentProfile.objects.select_related('user','klass').all()
    serializer_class = StudentProfileSerializer
    permission_classes = [IsAuthenticated, IsAdminOrTeacher]

class ResultViewSet(viewsets.ModelViewSet):
    queryset = Result.objects.select_related('student','subject').all()
    serializer_class = ResultSerializer
    permission_classes = [IsAuthenticated, IsAdminOrTeacher]

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated, IsAdminOrTeacher])
    def approve(self, request, pk=None):
        result = self.get_object()
        result.approved = True
        result.save()
        # send real-time notification via channels
        try:
            channel_layer = get_channel_layer()
            async_to_sync(channel_layer.group_send)('notifications', {'type': 'result_approved', 'message': f'Result approved for {result.student.student_id}'})
        except Exception:
            pass

        return Response(self.get_serializer(result).data)

    @action(detail=True, methods=['get'], permission_classes=[IsAuthenticated])
    def pdf(self, request, pk=None):
        result = get_object_or_404(Result, pk=pk)
        buffer = export_result_pdf(result)
        response = HttpResponse(buffer, content_type='application/pdf')
        response['Content-Disposition'] = f'attachment; filename="result_{result.id}.pdf"'
        return response

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def gpa(self, request):
        student_id = request.query_params.get('student_id')
        if not student_id:
            return Response({'detail':'student_id required'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            student = StudentProfile.objects.get(student_id=student_id)
        except StudentProfile.DoesNotExist:
            return Response({'detail':'student not found'}, status=status.HTTP_404_NOT_FOUND)
        results = student.results.filter(approved=True)
        gpa = calculate_gpa(results)
        return Response({'student': student.student_id, 'gpa': str(gpa)})

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated, IsAdmin])
    def export_csv(self, request):
        """Export all results as CSV (admin only)"""
        queryset = self.get_queryset()

        def stream():
            header = ['id','student_id','student_username','subject','score','approved','graded','created_at']
            yield ','.join(header) + '\n'
            for r in queryset.iterator():
                row = [
                    str(r.id),
                    r.student.student_id,
                    r.student.user.username,
                    r.subject.name,
                    str(r.score),
                    str(r.approved),
                    str(r.graded),
                    r.created_at.isoformat(),
                ]
                yield ','.join(row) + '\n'

        response = StreamingHttpResponse(stream(), content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="results_export.csv"'
        return response

