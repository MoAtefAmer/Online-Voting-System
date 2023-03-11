

# Function that returns the possible status of a poll
def get_status_choices():
    IN_PROGRESS = 'inProgress'
    COMPLETED = 'completed'
    CANCELED = 'canceled'

    STATUS_CHOICES = (
        (IN_PROGRESS, 'In Progress'),
        (COMPLETED, 'Completed'),
        (CANCELED,'Canceled'),
    )

    return STATUS_CHOICES