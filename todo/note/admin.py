from django.contrib import admin
from django.contrib.admin import register
from note.models import Note, Project


@register(Note)
class NoteAdmin(admin.ModelAdmin):
    list_display = ('text', 'project', 'user', 'date_of_creation', 'update_date', 'active')
    list_display_links = ('text',)

@register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('name', 'active', 'link_to_repo', 'date_of_creation', 'date_of_deletion')
    list_display_links = ('name',)