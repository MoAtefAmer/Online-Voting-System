from django.db import models
from .shared.get_status_choices import get_status_choices



# Create your models here.

class Polls(models.Model):
    title = models.CharField(max_length=100)
    status = models.CharField(choices=get_status_choices(),max_length=20)
    description = models.CharField(max_length=300,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    end_date = models.DateTimeField('End Date')
    
    
    def __str__(self):
        return self.title
    
    # Retrieve the records according to the nearest end date
    class Meta:
        ordering = ['-end_date']
    
    

class Choices(models.Model):
    poll = models.ForeignKey(Polls,on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=100)
    number_of_votes = models.IntegerField(default=0)
  
    
    def __str__(self):
        return self.choice_text

    class Meta:
        ordering = ['poll_id']

    
class Voters(models.Model):
    email = models.EmailField(max_length=100)
    is_confirmed = models.BooleanField(default=False)
    otp = models.CharField(max_length=300)
    choice = models.ForeignKey(Choices,on_delete=models.CASCADE)
    poll = models.ForeignKey(Polls,on_delete=models.CASCADE)
    
    
    def __str__(self):
        return self.email