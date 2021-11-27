from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer
from rest_framework import serializers
from note.models import Project, Note
from users.serializers import UserModelSerializer



class NoteModelSerializer(ModelSerializer):
    class Meta:
        model = Note
        fields = ['text', 'user', 'project', 'date_of_creation', 'update_date', 'active']


class ProjectModelSerializer(ModelSerializer):
    class Meta:
        model = Project
        fields = ['name', 'user', 'link_to_repo', 'active']