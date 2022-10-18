from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from .serializers import RegisterSerializer
from .serializers import UserSerializer
from .serializers import PostSerializer
from .serializers import ActivityLogSerializer
from test_sonar_api.models import Post
from test_sonar_api.models import ActivityLog



#Register API
class RegisterApi(GenericAPIView):
    serializer_class = RegisterSerializer
    def post(self, request, *args,  **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
        })

class PostApiView(GenericAPIView):
    
    permission_classes = [permissions.IsAuthenticated] # auth views

    def update_activity(self, post, user, interaction_type):
        '''
        Update the activity of the post
        '''
        if interaction_type == 1:
            post.likes += 1
        else:
            post.views += 1
        post.save()
        ActivityLog.objects.create(interaction_type=interaction_type, post=post, user=user)
        return post

    def get(self, request, *args, **kwargs):
        '''
        List all the posts or by id
        '''
        if request.query_params:    
            posts = Post.objects.filter(**request.query_params.dict())
        else:
            posts = Post.objects.order_by('-likes','-views')
        if posts:
            serializer = PostSerializer(posts, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        return Response(status=status.HTTP_404_NOT_FOUND)

    def post(self, request, *args, **kwargs):
        '''
        Create the post with fields
        '''
        data = {
            'image_src': request.data.get('image_src'), 
            'title': request.data.get('title'),
            'description': request.data.get('description'), 
            'user': request.user.id
        }
        serializer = PostSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def patch(self, request, *args, **kwargs):
        '''
        Update the activity of the post
        '''
        post = Post.objects.filter(id=request.data.get('id')).first()
        if post:
            post = self.update_activity(post, request.user, request.data.get('interaction_type'))
            serializer = PostSerializer(post)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        return Response(status=status.HTTP_404_NOT_FOUND)

class ActivityLogCreateView(GenericAPIView):
    permission_classes = [permissions.IsAuthenticated] # auth views

    def post(self, request, *args,  **kwargs):
        data = {
            'interaction_type': request.data.get('interaction_type'),
            'post': request.data.get('post'),
            'user': request.user.id
        }
        serializer = ActivityLogSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)