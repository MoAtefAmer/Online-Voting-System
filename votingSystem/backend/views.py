from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.conf import settings
from django_otp import devices_for_user
from django_otp.plugins.otp_email.models import EmailDevice
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
        poll_id = serializer.validated_data['poll_id']
        choice_id = serializer.validated_data['choice_id']
        email = serializer.validated_data['email']
        # otp = serializer.validated_data['otp']

        # Check if the poll and choice exist
        try:
            poll = Polls.objects.get(id=poll_id)
            choice = Choices.objects.get(id=choice_id, poll=poll)
        except (Polls.DoesNotExist, Choices.DoesNotExist):
            return Response({'error': 'Invalid poll or choice ID'}, status=status.HTTP_400_BAD_REQUEST)

        # # Check if the email is valid and has a valid OTP device
        # try:
        #     user = EmailDevice.objects.get(user__email=email)
        #     if not user.verify_token(otp):
        #         return Response({'error': 'Invalid OTP'}, status=status.HTTP_400_BAD_REQUEST)
        # except EmailDevice.DoesNotExist:
        #     return Response({'error': 'Invalid email or OTP device'}, status=status.HTTP_400_BAD_REQUEST)

        # Check if the user has already voted on this poll
        if Voters.objects.filter(email=email, poll=poll).exists():
            return Response({'error': 'User has already voted on this poll'}, status=status.HTTP_400_BAD_REQUEST)

        try:
           send_email(email=email,poll=poll,choice=choice)
           
            
        except Exception as e:
            response = f"Something went wrong with the email address. Please try again. Error message: {str(e)}"
            return Response({'error':response},status=status.HTTP_400_BAD_REQUEST)
        
        # Record the user's vote and send the confirmation email
        voter = Voters.objects.create(
        email=email, choice=choice, poll=poll)
        voter.save()

        return Response({'success': 'Vote recorded and confirmation email sent'}, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
