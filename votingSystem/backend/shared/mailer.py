import os
import requests
from django.core.mail import send_mail
from decouple import config


EMAIL_SENDER = config('EMAIL_SENDER')




def send_email(email, poll, choice):
    subject = f'Confirmation for your vote on poll "{poll.title}"'
    message = f'Thank you for voting on poll "{poll.title}". Your vote for choice "{choice.choice_text}" has been recorded.'
    from_email = EMAIL_SENDER
    recipient_list = [email]
   

    try:
        send_mail(subject=subject,message=message,from_email=from_email,recipient_list=recipient_list,fail_silently=False)

    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")
        return False

    return True