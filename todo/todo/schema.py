import graphene
from graphene import ObjectType
from graphene_django import DjangoObjectType
from users.models import User
from note.models import Note, Project