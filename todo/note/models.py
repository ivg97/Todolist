from django.db import models

from users.models import User


class Project(models.Model):
    name = models.CharField(max_length=200, name='name')
    link_to_repo = models.URLField(blank=True, null=True, max_length=75, name='link_to_repo')
    user = models.ManyToManyField(User, name='user')
    date_of_creation = models.DateTimeField(auto_now_add=True, name='date_of_creation')
    date_of_deletion = models.DateTimeField(auto_now=True, name='date_of_deletion')
    notes = models.ForeignKey('Note', on_delete=models.CASCADE, name='notes')
    active = models.BooleanField(default=True, name='active')

    def __str__(self):
        return f'Проект "{self.name}" от "{self.date_of_creation}"'



class Note(models.Model):
    text = models.TextField(name='text')
    date_of_creation = models.DateTimeField(auto_now_add=True, name='date_of_creation')
    update_date = models.DateTimeField(auto_now=True, name='update_date')
    user = models.ForeignKey(User,on_delete=models.PROTECT, name='user')
    active = models.BooleanField(default=True, name='active')

    def __str__(self):
        return f'Заметка пользователя "{self.user}" от "{self.date_of_creation}"'