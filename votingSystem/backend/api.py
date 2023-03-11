from rest_framework import viewsets, permissions,filters
from backend.models import Polls
from .serializers import PollSerializer
from django_filters.rest_framework import DjangoFilterBackend



class PollsViewSet(viewsets.ModelViewSet):
    queryset = Polls.objects.all()
    serializer_class = PollSerializer
    
    # Add the ability to search by using terms from title ,desc or even choices
    # Add the ability to get according to status i.e. inProgress,completed,etc...
    filter_backends = [DjangoFilterBackend,filters.SearchFilter]
    filterset_fields = ['status']
    search_fields = ['title','description','choices__choice_text']
    
   
    # overwrite the permissions func to have anyone get but only admins to post,put,delete,etc...
    def get_permissions(self):
        if self.request.method == 'GET':
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]

