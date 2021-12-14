from rest_framework.pagination import LimitOffsetPagination
from rest_framework.viewsets import ModelViewSet
from rest_framework import mixins

from note.filters import ProjectFilter, NoteFilter
from note.models import Project, Note
from note.serializers import ProjectModelSerializer, NoteModelSerializer


class ProjectLimitPagination(LimitOffsetPagination):
    default_limit = 10


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    pagination_class = ProjectLimitPagination
    filter_class = ProjectFilter


class NoteLimitPagination(LimitOffsetPagination):
    default_limit = 20


class NoteModelViewSet(ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteModelSerializer
    pagination_class = NoteLimitPagination
    filter_class = NoteFilter
