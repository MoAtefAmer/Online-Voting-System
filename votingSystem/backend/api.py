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
    permission_classes=[
        permissions.AllowAny
    ]
    
# class InProgressPollsViewSet(viewsets.ModelViewSet):
#     queryset = Polls.objects.filter(status='InProgress')
#     serializer_class = PollSerializer
    

    

#     def get_permissions(self):
#         if self.action in ['create', 'update', 'partial_update', 'destroy']:
#             permission_classes = [permissions.IsAdminUser]
#         else:
#             permission_classes = [permissions.AllowAny]
#         return [permission() for permission in permission_classes]
