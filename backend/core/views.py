from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import AuditLog
from django.db.models import Avg

@api_view(['GET'])
def health_check(request):
    return Response({'status': 'ok'})

@api_view(['GET'])
def analytics_summary(request):
    # simple analytics endpoint
    from portal.models import StudentProfile, Result
    students = StudentProfile.objects.count()
    avg_score = Result.objects.aggregate(avg=Avg('score'))['avg']
    return Response({'students': students, 'avg_score': avg_score})
