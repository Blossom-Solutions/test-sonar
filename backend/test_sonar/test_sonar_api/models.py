from django.db import models
from django.conf import settings
import enum

# Enums
@enum.unique
class InteractionType(int, enum.Enum):
    LIKE = 1
    VIEW = 2

    @classmethod
    def choices(cls):
        return [(item.value, item.name) for item in cls]

# Create your models here.
class Post(models.Model):
    image_src = models.CharField(max_length = 256, blank = True)
    title = models.CharField(max_length = 100)
    description = models.CharField(max_length = 512, blank = True)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete = models.CASCADE
    )
    def __str__(self):
        return self.title

class ActivityLog(models.Model):
    timestamp = models.DateTimeField(auto_now_add=True)
    interaction_type = models.PositiveSmallIntegerField(choices = InteractionType.choices())
    post = models.ForeignKey(
        Post,
        on_delete = models.CASCADE
    )
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete = models.CASCADE  # depending if we want to persist logs this could be removed, and adjust a job to clear in a basis)
    )



