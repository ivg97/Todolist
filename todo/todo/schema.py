import graphene
from graphene import ObjectType
from graphene_django import DjangoObjectType
from users.models import User
from note.models import Note, Project



# class Query(ObjectType):
#     hello = graphene.String(default_value='Hi!')
#
# schema = graphene.Schema(query=Query)




class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = '__all__'

class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'
class NoteType(DjangoObjectType):
    class Meta:
        model = Note
        fields = '__all__'


class Query(ObjectType):
    # all_users = graphene.List(UserType)
    # all_projects = graphene.List(ProjectType)
    # all_notes = graphene.List(NoteType)
    #
    # def resolve_all_users(self, info):
    #     return User.objects.all()
    user_by_id = graphene.Field(UserType, id=graphene.Int(required=False))

    def resolve_user_by_id(root, info, id=None):
        if id:
            return User.objects.get(id=id)
        return None

    # project_by_user = graphene.List(ProjectType, first_name=graphene.String(required=False))
    #
    # def resolve_project_by_user(root, info, first_name=None):
    #     projects = Project.objects.all()
    #     if first_name:
    #         return projects.filter(user__first_name=first_name)
    #     return projects

    project_by_id = graphene.Field(ProjectType, id=graphene.Int(required=True))

    def resolve_project_by_id(self, info, id=None):
        try:

            if id:
                return Project.objects.get(id=id)
        except Exception:
            return None

schema = graphene.Schema(query=Query)



