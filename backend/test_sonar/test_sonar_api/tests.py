# Django
from django.test import TestCase
import json

# Django Rest Framework
from rest_framework.test import APIClient
from rest_framework import status

# Models
from django.contrib.auth.models import User
from test_sonar_api.models import Post, ActivityLog

class UserTestCase(TestCase):
    def setUp(self):
        user = User.objects.create_user(
            username='testuser'
        )
        
        user.set_password('testpassword')
        user.save()
    def test_signup_user(self):
        client = APIClient()
        response = client.post(
            '/test/api/register/',
            data=json.dumps({
                'username': 'testuser1',
                'password': 'testpassword1'
            }),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_login_user(self):
        client = APIClient()
        response = client.post(
            '/test/api/login/',
            data=json.dumps({
                'username': 'testuser',
                'password': 'testpassword'
            }),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class PostTestCase(TestCase):
    def setUp(self):
        user = User.objects.create_user(
            username='testuser'
        )
        
        user.set_password('testpassword')
        user.save()

        client = APIClient()
        response = client.post(
                '/test/api/login/', {
                'username': 'testuser',
                'password': 'testpassword',
            },
            format='json'
        )

        result = json.loads(response.content)
        self.access_token = result['access']
        self.user = user

        
        
    def test_create_post(self):
        client = APIClient()
        client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.access_token)
        response = client.post(
            '/test/api/posts/',
            data=json.dumps({
                'title': 'Test Title',
                'description': 'Test Body',
                'image_src': 'www.test.com',
            }),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    
    def test_get_post(self):
        post = Post.objects.create(
            title='Test Title',
            description='Test Body',
            image_src='www.test.com',
            user=self.user
        )
        post.save()
        client = APIClient()
        client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.access_token)
        response = client.get(
            '/test/api/posts/',
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_update_post(self):
        post = Post.objects.create(
            title='Test Title',
            description='Test Body',
            image_src='www.test.com',
            user=self.user
        )
        post.save()
        client = APIClient()
        client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.access_token)
        response = client.patch(
            '/test/api/posts/',
            data=json.dumps({
                'id': post.id,
                'interaction_type': 1
            }),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
