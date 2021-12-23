from django.test import TestCase
from mixer.backend.django import mixer
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Note
from users.models import User


class TestNoteViewsSet(APITestCase):

    def test_get_list(self):
        response = self.client.get('/api/notes/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_note_mixer(self):
        note = mixer.blend(Note)
        admin = User.objects.create_superuser('admin1', 'admin@mail.ru', 'admin')
        self.client.login(userame='admin1', password='admin')
        response = self.client.put(f'/api/notes/{note.id}/', {'name': 'test1',})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        note = Note.objects.get(id=note.id)
        self.assertEqual(note.name, 'test1')
