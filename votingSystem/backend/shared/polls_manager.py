from django.db.models import Case, When
from django.db import models

# order the polls by the nearest expiry and the inProgress first
class PollsManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().annotate(
            status_order=Case(
                When(status='inProgress', then=0),
                When(status='completed', then=1),
                When(status='canceled', then=2),
                default=3,
                output_field=models.IntegerField(),
            ),
        ).order_by('status_order', '-end_date')