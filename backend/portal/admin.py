from django.contrib import admin
from .models import Subject, SchoolClass, StudentProfile, Result

@admin.register(Subject)
class SubjectAdmin(admin.ModelAdmin):
    list_display = ('name', 'code')

@admin.register(SchoolClass)
class SchoolClassAdmin(admin.ModelAdmin):
    list_display = ('name', 'teacher')

@admin.register(StudentProfile)
class StudentProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'student_id', 'klass')

@admin.register(Result)
class ResultAdmin(admin.ModelAdmin):
    list_display = ('student','subject','score','approved','graded','created_at')
