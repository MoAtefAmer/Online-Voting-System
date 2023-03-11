from rest_framework import routers
from .api import PollsViewSet

router = routers.DefaultRouter(
 
)
router.register('api/polls',PollsViewSet,'polls')


urlpatterns = router.urls