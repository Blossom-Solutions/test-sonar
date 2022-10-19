# initial_setup.py
import random
from django.core.management import call_command

from django.db import transaction
from django.core.management.base import BaseCommand

from test_sonar_api.models import Post, ActivityLog
from django.contrib.auth.models import User
from test_sonar_api.factories import (
    UserFactory,
    PostFactory,
    ActivityLogFactory
)

NUM_USERS = 100
NUM_POSTS = 50
NUM_ACTIVITY_LOGS = 10000

class Command(BaseCommand):
    help = "Generates test data"

    @transaction.atomic
    def handle(self, *args, **kwargs):
        self.stdout.write("Deleting old data...")
        models = [User, Post, ActivityLog]
        for m in models:
            m.objects.all().delete()

        self.stdout.write("Creating new data...")
        # Create all the users
        users = []
        for _ in range(NUM_USERS):
            user = UserFactory()
            users.append(user)

        # Add some posts
        posts = []
        for _ in range(NUM_POSTS):
            post_user = random.choice(
                users
            )
            post = PostFactory(user=post_user)
            posts.append(post)

        # Create all the logs
        for _ in range(NUM_ACTIVITY_LOGS):
            log_user = random.choice(users)
            log_post = random.choice(posts)
            activity_log = ActivityLogFactory(user=log_user, post=log_post)