from rest_framework import viewsets, permissions,filters
from backend.models import Polls
from .serializers import PollSerializer
from django_filters.rest_framework import DjangoFilterBackend



class PollsViewSet(viewsets.ModelViewSet):
    queryset = Polls.objects.all()
    serializer_class = PollSerializer
    filter_backends = [DjangoFilterBackend,filters.SearchFilter]
    filterset_fields = ['status']
    search_fields = ['title','description','choices__choice_text']
  
    
    def get_permissions(self):
        if self.request.method == 'GET':
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]

