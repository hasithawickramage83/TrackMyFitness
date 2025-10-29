from django.db import models

# Create your models here.
from django.db import models
# Create Activity Model to handle activities
class Activity(models.Model):
    user = models.CharField(max_length=100)
    activity_type = models.CharField(max_length=50)

    STATUS_CHOICES = [
        ('planned', 'Planned'),
        ('in progress', 'In Progress'),
        ('completed', 'Completed'),
    ]

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='planned'
    )
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} - {self.activity_type} ({self.status})"
from django.db import models

# Create your models here.

