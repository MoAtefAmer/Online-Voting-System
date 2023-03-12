from rest_framework import serializers
from backend.models import Polls, Choices
from datetime import datetime


# Choice Serializer
class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choices
        fields = ['id', 'choice_text', 'number_of_votes']


# Poll Serializer
class PollSerializer(serializers.ModelSerializer):
    # Adding choices as a related name to the Poll model to be able to display it in the json object response
    choices = ChoiceSerializer(many=True)

    class Meta:
        model = Polls
        fields = ['id', 'title', 'status', 'description',
                  'created_at', 'end_date', 'choices']


# Vote Serialzier
class VoteSerializer(serializers.Serializer):
    poll_id = serializers.IntegerField()
    choice_id = serializers.IntegerField()
    email = serializers.EmailField()

    

