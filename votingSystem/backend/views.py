import datetime
from decouple import config
from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django_otp import devices_for_user
from django.utils import timezone
from .shared.otp.otp_generator import generate_otp
from .shared.otp.otp_validator import verify_otp
from .models import Polls, Choices, Voters
from .serializers import VoteSerializer
from .shared.otp.consume_otp import consume_otp
from .shared.mailer import send_email
from django.db.models import F

# Create your views here.


@api_view(['POST'])
def vote_on_polls(request):
    serializer = VoteSerializer(data=request.data)
    if serializer.is_valid():
        poll_id: int = serializer.validated_data['poll_id']
        choice_id: int = serializer.validated_data['choice_id']
        email: str = serializer.validated_data['email']
        otp_timestamp: int = int(timezone.now().timestamp())

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

        # Check if the vote has already been already confirmed
        if Voters.objects.filter(email=email, poll=poll, is_confirmed=True).exists():
            return Response({'error': 'User has already voted and confirmed his vote on this poll'}, status=status.HTTP_400_BAD_REQUEST)

        step = int(config('STEP'))
        # Diffcult to explain but this number if its less than the otp_timestamp then the otp is still valid
        number = int(otp_timestamp) - step

        
        # Check if the user still hasnt confirmed his vote and the otp still hasnt expired
        if Voters.objects.filter(email=email, poll=poll, is_confirmed=False, otp_timestamp__gt=number).exists():
            return Response({'error': 'You cannot revote on this poll, your otp is still valid'}, status=status.HTTP_400_BAD_REQUEST)

        voter = Voters.objects.filter(email=email, poll=poll, is_confirmed=False)
        if voter.exists():
            voter.update(otp_timestamp=otp_timestamp)   
        else:
            # Record the user's vote
            query = Voters.objects.create(
                email=email, choice=choice, poll=poll, created_at=datetime.datetime.now(), otp_timestamp=otp_timestamp)
            query.save()
            
            
 
      
        # Generate the otp
        generated_otp = generate_otp(
            email=email, voters_row_id=voter.values('pk').first()['pk'], otp_timestamp=otp_timestamp)

        # Send the email containing the otp
        try:
            send_email(email=email, poll=poll,
                       choice=choice, otp=generated_otp)
            

        except Exception as e:
            response = f"Something went wrong with the email address. Please try again. Error message: {str(e)}"
            return Response({'error': response}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'success': 'Vote recorded and otp email sent'}, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def confirm_vote(request):

    # Check if the required field is present in the request data
    if 'otp' not in request.data:
        return Response({'error': 'OTP field is missing'}, status=status.HTTP_400_BAD_REQUEST)

    serializer = VoteSerializer(data=request.data)

    if serializer.is_valid():
        poll_id: int = serializer.validated_data['poll_id']
        choice_id: int = serializer.validated_data['choice_id']
        email: str = serializer.validated_data['email']

        otp = request.data['otp']

        if not (Voters.objects.filter(email=email, poll_id=poll_id, choice_id=choice_id).exists()):
            return Response({'error': 'Vote does not exist'}, status=status.HTTP_400_BAD_REQUEST)

        voter = Voters.objects.filter(
            email=email, poll_id=poll_id, choice_id=choice_id)

        if (voter.filter(is_confirmed=True).exists()):
            return Response({'error': 'Vote has already been confirmed'}, status=status.HTTP_400_BAD_REQUEST)

        
        is_otp_verified = verify_otp(email=email, otp=otp, voters_row_id=voter.values(
            'pk').first()['pk'], otp_timestamp=voter.values('otp_timestamp').first()['otp_timestamp'])

        # If otp is correct consume the otp and increment the number of votes by 1
        if (is_otp_verified):
            if (consume_otp(Voters)):
                Choices.objects.filter(poll_id=poll_id, pk=choice_id).update(
                    number_of_votes=F('number_of_votes')+1)
                return Response({"success": "Your vote has been confirmed"}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Wrong Otp '}, status=status.HTTP_401_UNAUTHORIZED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
