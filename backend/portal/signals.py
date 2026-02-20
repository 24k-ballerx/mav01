from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Result
from core.models import AuditLog
from .tasks import send_result_notification

@receiver(post_save, sender=Result)
def result_post_save(sender, instance, created, **kwargs):
    # log approvals and notify
    if instance.approved:
        AuditLog.objects.create(user=None, action=f'Result approved: {instance.id}', meta={'student': instance.student.student_id, 'score': str(instance.score)})
        # queue email to student user if email exists
        try:
            email = instance.student.user.email
            if email:
                send_result_notification.delay(email, 'Result Approved', f'Your result for {instance.subject.name} has been approved.')
        except Exception:
            pass
