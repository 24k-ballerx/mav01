from django.core.management.base import BaseCommand
from users.models import User
from portal.models import Subject, SchoolClass, StudentProfile

class Command(BaseCommand):
    help = 'Seed portal sample data (subjects, classes, students)'

    def handle(self, *args, **options):
        # subjects
        subjects = ['Mathematics','English Language','Physics','Chemistry','Biology']
        for s in subjects:
            Subject.objects.get_or_create(name=s)

        # classes and sample teacher
        teacher, _ = User.objects.get_or_create(username='mrsmith', defaults={'email':'mrsmith@school.test','role':'teacher'})
        klass, created = SchoolClass.objects.get_or_create(name='Form 1A', defaults={'teacher': teacher})

        # sample student users
        for i in range(1,6):
            username = f'student{i}'
            user, created = User.objects.get_or_create(username=username, defaults={'email':f'{username}@school.test','role':'student'})
            StudentProfile.objects.get_or_create(user=user, student_id=f'STUD{i:03}', klass=klass)

        self.stdout.write(self.style.SUCCESS('Seeded portal sample data'))
