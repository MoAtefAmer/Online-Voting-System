from rest_framework import routers
from .api import PollsViewSet
from .views import vote_on_polls
from django.urls import path

router = routers.DefaultRouter(
 
)
router.register('api/polls',PollsViewSet,'polls')



urlpatterns = [
    # ...
    path('api/vote_on_polls', vote_on_polls, name='vote_on_polls'),
] + router.urls