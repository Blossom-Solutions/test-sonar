import factory
from factory.django import DjangoModelFactory
from .models import Post
from .models import ActivityLog
from django.contrib.auth.models import User
import random


class UserFactory(DjangoModelFactory):
    class Meta:
        model = User
    
    username = factory.Faker("user_name")
    password = factory.Faker("password")

class PostFactory(DjangoModelFactory):
    class Meta:
        model = Post
    
    image_src = factory.Faker("image_url")
    title = factory.Faker("sentence")
    description = factory.Faker("text")
    user = factory.SubFactory(UserFactory)
    likes = factory.Faker("pyint")
    views = factory.Faker("pyint")

class ActivityLogFactory(DjangoModelFactory):
    class Meta:
        model = ActivityLog
    
    interaction_type = random.randint(1,2)
    post = factory.SubFactory(PostFactory)
    user = factory.SubFactory(UserFactory)