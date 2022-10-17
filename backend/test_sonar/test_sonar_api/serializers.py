from rest_framework import  serializers
from django.contrib.auth.models import User 
from .models import Post, ActivityLog

# Register serializer
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username','password')
        extra_kwargs = {
            'password':{'write_only': True},
        }

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['username'], 
            password = validated_data['password']
        )
        return user

# User serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')

# Post serializer
class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ["image_src", "title", "description", "user"]

class ActivityLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActivityLog
        fields = ("interaction_type","post", "user")