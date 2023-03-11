from rest_framework import serializers
from backend.models import Polls
from datetime import datetime


# Poll Serializer
class PollSerializer(serializers.ModelSerializer):
    def get_status(self, obj):
        if obj.end < datetime.now():
            return 'completed'
        else:
            return 'inProgress'

    class Meta:
        model = Polls
        fields = '__all__'


class VoteSerializer(serializers.Serializer):
    poll_id = serializers.IntegerField()
    choice_id = serializers.IntegerField()
    email = serializers.EmailField()
    # otp = serializers.CharField(max_length=6)