from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
import json
from mixer.backend.django import mixer
from .models import User
from .views import UserModelViewSet

class TestUserViewSet(TestCase):
    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/users/')
        view = UserModelViewSet.as_view({'get':'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_user(self):
        factory = APIRequestFactory()
        request = factory.post('/api/users/', {'username': 'test_create_user', 'email':'test_user@mail.ru'}, format='json')
        view = UserModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_admin(self):
        factory = APIRequestFactory()
        request = factory.post('/api/users/', {'username': 'test_create_admin', 'email':'create_admin@mail.ru'}, format='json')
        admin = User.objects.create_superuser('test_admin', 'test_admin@mail.ru', 'test_admin')
        force_authenticate(request, admin)
        view = UserModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_detail(self):
        user = User.objects.create(password='test1234',username='test', email='test1@mail.ru')
        client = APIClient()
        response = client.get(f'/api/users/{user.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_user(self):
        user = User.objects.create(password='test1234',username='test2', email='test1@mail.ru')
        client = APIClient()
        response = client.put(f'/api/users/{user.id}/', {'last_name': 'test2'})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_edit_admin(self):
        user = User.objects.create(password='test1234',username='test3', email='test1@mail.ru')
        client = APIClient()
        admin = User.objects.create_superuser('test_admin2', 'test_admin@mail.ru', 'test_admin')
        client.login(username='test_admin2', password='test_admin')
        response = client.put(f'/api/users/{user.id}/', {'last_name':'TEST'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        user = User.objects.get(id=user.id)
        self.assertEqual(user.last_name, 'TEST')
        client.logout()
