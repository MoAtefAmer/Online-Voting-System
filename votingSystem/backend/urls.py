from rest_framework import routers
from .api import PollsViewSet
from .views import vote_on_polls,confirm_vote
from django.urls import path

router = routers.DefaultRouter(
 
)
router.register('api/polls',PollsViewSet,'polls')



urlpatterns = [
    # ...
    path('api/vote_on_polls', vote_on_polls, name='vote_on_polls'),
    path('api/confirm_vote', confirm_vote, name='confirm_vote'),
] + router.urls