import datetime
from decouple import config
from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.conf import settings
from django_otp import devices_for_user
from django_otp.plugins.otp_email.models import EmailDevice
from django.utils import timezone
from .shared.otp.otp_generator import generate_otp
from .shared.otp.otp_validator import verify_otp
from .models import Polls, Choices, Voters
from .serializers import VoteSerializer
import smtplib
from email.mime.text import MIMEText
from django.core.mail import EmailMessage
from .shared.mailer import send_email

# Create your views here.


@api_view(['POST'])
def vote_on_polls(request):
    serializer = VoteSerializer(data=request.data)
    if serializer.is_valid():
        poll_id:int = serializer.validated_data['poll_id']
        choice_id:int = serializer.validated_data['choice_id']
        email:str = serializer.validated_data['email']
        otp_timestamp:str = str(int(timezone.now().timestamp()))
    

        # Check if the poll and choice exist
        try:
            poll = Polls.objects.get(id=poll_id)
            choice = Choices.objects.get(id=choice_id, poll=poll)
        except (Polls.DoesNotExist, Choices.DoesNotExist):
            return Response({'error': 'Invalid poll or choice ID'}, status=status.HTTP_400_BAD_REQUEST)

       # Check if the poll is expired or canceled
        try:
            poll = Polls.objects.get(id=poll_id)
            if poll.status == 'completed':
                return Response({'error': 'This poll has expired'}, status=status.HTTP_410_GONE)
            elif poll.status == 'canceled':
                return Response({'error': 'This poll has been cancelled'}, status=status.HTTP_400_BAD_REQUEST)

        except Polls.DoesNotExist:
            return Response({'error': 'The requested poll does not exist'}, status=status.HTTP_404_NOT_FOUND)
        
        
        
        
        
        

        # Check if the user has already voted on this poll
        if Voters.objects.filter(email=email, poll=poll).exists():
            return Response({'error': 'User has already voted on this poll'}, status=status.HTTP_400_BAD_REQUEST)




        # Convert the datetime object to a Unix timestamp string to store it in the db
        
   
        # Record the user's vote
        voter = Voters.objects.create(
        email=email, choice=choice, poll=poll,created_at=datetime.datetime.now(),otp_timestamp=otp_timestamp)
        voter.save()
        
        generated_otp =generate_otp(email='druidoftheclaw420@gmail.com',voters_row_id=17,otp_timestamp="167865419")
        
       
        # Send the email containing the otp
        try:
           send_email(email=email,poll=poll,choice=choice,otp=generated_otp)

        except Exception as e:
            response = f"Something went wrong with the email address. Please try again. Error message: {str(e)}"
            return Response({'error':response},status=status.HTTP_400_BAD_REQUEST)
        
     

        
  
        return Response({'success': 'Vote recorded and otp email sent'}, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
