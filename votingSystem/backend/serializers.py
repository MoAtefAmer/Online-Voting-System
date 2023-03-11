from rest_framework import serializers
from backend.models import Polls
from datetime import datetime


# Poll Serializer
class PollSerializer(serializers.ModelSerializer):
    def get_status(self, obj):
        if obj.end_date < datetime.now():
            return 'completed'
        else:
            return 'inProgress'

    class Meta:
        model = Polls
        fields = '__all__'
