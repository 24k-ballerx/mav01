from django.core.management.base import BaseCommand
from users.models import User

class Command(BaseCommand):
    help = 'Seed sample data for development'

    def handle(self, *args, **options):
        if not User.objects.filter(username='admin').exists():
            User.objects.create_superuser('admin', email='admin@school.test', password='password', role='admin')
            self.stdout.write(self.style.SUCCESS('Created admin user'))
        else:
            self.stdout.write('Admin user already exists')
