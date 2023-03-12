from django.db import models
from .shared.get_status_choices import get_status_choices
from django.dispatch import receiver
from django.utils import timezone
from django.db.models.signals import post_save
from .shared.polls_manager import PollsManager
from django.db.models import Case, When
# Create your models here.





class Polls(models.Model):
    title = models.CharField(max_length=100)
    status = models.CharField(choices=get_status_choices(), max_length=20)
    description = models.CharField(max_length=300, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    end_date = models.DateTimeField('End Date', db_index=True)

    objects = PollsManager()

    def __str__(self):
        return self.title

    # Retrieve the records according to the nearest end date
    class Meta:
        ordering = ['-end_date']


class Choices(models.Model):
    poll = models.ForeignKey(Polls,related_name='choices', on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=100)
    number_of_votes = models.IntegerField(default=0)

    def __str__(self):
        return self.choice_text

    class Meta:
        ordering = ['poll_id']


class Voters(models.Model):
    email = models.EmailField(max_length=100)
    is_confirmed = models.BooleanField(default=False)
    otp_timestamp = models.CharField(max_length=300,blank=True,null=True,default='s')
    choice = models.ForeignKey(Choices, on_delete=models.CASCADE)
    poll = models.ForeignKey(Polls, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.email

# a signal that checks upon creating of the vote if the end_date has already passed or not
@receiver(post_save, sender=Polls)
def update_poll_status(sender, instance, **kwargs):
    if instance.end_date <= timezone.now() and instance.status == 'inProgress':
        instance.status = 'completed'
        instance.save()
