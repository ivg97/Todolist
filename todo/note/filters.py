import django_filters
from django.db import models
from django.utils import timezone
from datetime import timedelta


from django_filters import rest_framework


from .models import Project, Note

class ProjectFilter(rest_framework.FilterSet):
    name = rest_framework.CharFilter(lookup_expr='contains')

    class Meta:
        model = Project
        fields = ['name']


class NoteFilter(rest_framework.FilterSet):
    project = rest_framework.NumberFilter(field_name='project')
    # start_data = rest_framework.NumberFilter(field_name='date_of_creation', method='get_past_hours', label='Начальная дата')
    # expiration_date = rest_framework.NumberFilter(field_name='date_of_creation', method='get_past_hours', label="Конечная дата")
    #
    # def get_past_hours(self, queryset, field_name, value):
    #     time_start = timezone.now() - timedelta(hours=int(value))
    #     return queryset.filter(date_of_creation__gte=time_start)
    #
    class Meta:
        model = Note
        # fields = ['project', 'start_data', 'expiration_date']
        fields = ['project']