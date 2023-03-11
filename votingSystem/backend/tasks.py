from django.utils import timezone

from django_cron import CronJobBase, Schedule
from .models import Polls
def update_expired_polls():
    expired_polls = Polls.objects.filter(end_date__lte=timezone.now(), status='inProgress')
    print(expired_polls)
    for poll in expired_polls:
        poll.status = 'completed'
        poll.save()




class ExpiredPollsCronJob(CronJobBase):
       RUN_EVERY_MINS = 1

       schedule = Schedule(run_every_mins=RUN_EVERY_MINS)
       code = 'backend.update_expired_polls'

       def do(self):
           Polls.objects.filter(end_date__lt=timezone.now()).update(status='completed')