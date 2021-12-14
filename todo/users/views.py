from django.shortcuts import render
from rest_framework.generics import UpdateAPIView, ListAPIView, RetrieveAPIView, RetrieveUpdateAPIView
from rest_framework.mixins import CreateModelMixin
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework import mixins

from users.models import User
from users.serializers import UserModelSerializer


class UserModelViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer


class UserCustomViewSet(mixins.ListModelMixin, mixins.UpdateModelMixin, CreateModelMixin,
                        mixins.RetrieveModelMixin, GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]



