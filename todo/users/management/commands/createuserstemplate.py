from django.core.management import BaseCommand

from users.models import User


class Command(BaseCommand):
    def handle(self, *args, **options):
        users_list = [
            {'username':'Alex', 'email':'alex@mail.ru', 'password':'alex1234'},
            {'username':'Maks', 'email':'maks@mail.ru', 'password':'maks1234'},
            {'username':'Anastasiya', 'email':'nastya@mail.ru', 'password': 'anastasiya1234'},
            {'username':'I', 'email':'i@mail.ru', 'password':'iiii1234'}
                      ]
        try:
            User.objects.create_superuser(username='admin', email='admin@example.com', password='admin')
            self.stdout.write(self.style.SUCCESS(f'Superuser "admin" created successfully!'))
        except Exception as error:
            self.stdout.write(self.style.ERROR(f'Superuser "admin" not created! \n Error: {error} \n {"-" * 5}'))



        for user in users_list:
            try:
                User.objects.create_user(username=user['username'], email=user['email'], password=user['password'])
                self.stdout.write(self.style.SUCCESS(f'User \"{user["username"]}\" created successfully!'))
            except Exception as error:
                self.stdout.write(self.style.ERROR(f'User \"{user["username"]}\" not created! \n Error: {error} \n {"-" * 5}'))

