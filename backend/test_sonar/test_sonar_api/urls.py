
from django.urls import path
from .views import RegisterApi, PostApiView, ActivityLogCreateView
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('api/register/', RegisterApi.as_view()),
    path('api/login/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('api/posts/',PostApiView.as_view()),
    path('api/logs/', ActivityLogCreateView.as_view())
]