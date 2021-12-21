"""todo URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import permissions
from rest_framework.authtoken import views
from rest_framework.permissions import AllowAny
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from graphene_django.views import GraphQLView

from users.views import UserModelViewSet, UserCustomViewSet
from note.views import ProjectModelViewSet, NoteModelViewSet

router = DefaultRouter()
# router.register('users', UserModelViewSet)
router.register('users', UserCustomViewSet)
router.register('projects', ProjectModelViewSet)
router.register('notes', NoteModelViewSet)

from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title='Todolist',
        default_version='v1',
        description='Documentation to out project',
        contact=openapi.Contact(email='admin@mail.ru'),
        license=openapi.License(name='MIT'),
    ),
    public=True,
    permission_classes = (AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include(router.urls)),
    path('api-token-auth/', views.obtain_auth_token),
    # path('api/<str:version>/users/', UserCustomViewSet.as_view()),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0)),
    path('graphgl/', GraphQLView.as_view(graphql=True)),
]

