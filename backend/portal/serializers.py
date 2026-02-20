from rest_framework import serializers
from .models import Subject, SchoolClass, StudentProfile, Result
from users.serializers import UserSerializer

class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ['id', 'name', 'code']

class SchoolClassSerializer(serializers.ModelSerializer):
    teacher = UserSerializer(read_only=True)

    class Meta:
        model = SchoolClass
        fields = ['id', 'name', 'teacher']

class StudentProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = StudentProfile
        fields = ['id', 'user', 'student_id', 'klass']

class ResultSerializer(serializers.ModelSerializer):
    student = StudentProfileSerializer(read_only=True)
    subject = SubjectSerializer(read_only=True)

    class Meta:
        model = Result
        fields = ['id', 'student', 'subject', 'score', 'graded', 'approved', 'created_at']
