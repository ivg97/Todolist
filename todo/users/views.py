from django.shortcuts import render
from rest_framework.generics import UpdateAPIView, ListAPIView, RetrieveAPIView, RetrieveUpdateAPIView
from rest_framework.mixins import CreateModelMixin
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework import mixins

from .models import User
from .serializers import UserModelSerializer, UserModelSerializerV2


class UserModelViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
    # permission_classes = [AllowAny]


class UserCustomViewSet(mixins.ListModelMixin, mixins.UpdateModelMixin, CreateModelMixin,
                        mixins.RetrieveModelMixin, GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    # permission_classes = [IsAuthenticated]
    def get_serializer_class(self):
        if self.request.version == 'v2':
            return UserModelSerializerV2
        return UserModelSerializer

# class UserModelViewSetV2(ModelViewSet):
#     queryset = User.objects.all()
#     serializer_class = UserModelSerializerV2
#     renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
