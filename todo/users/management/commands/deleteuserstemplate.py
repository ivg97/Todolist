from django.core.management import BaseCommand

from users.models import User


class Command(BaseCommand):
    def handle(self, *args, **options):
        users_list = [
            {'username':'Alex', 'email':'alex@mail.ru'},
            {'username':'Maks', 'email':'maks@mail.ru'},
            {'username':'Anastasiya', 'email':'nastya@mail.ru'},
            {'username':'I', 'email':'i@mail.ru'}
        ]
        try:
            user = User.objects.get(username='admin', email='admin@example.com')
            user.delete()
            self.stdout.write(self.style.SUCCESS(f'Superuser "admin" deleted successfully!'))
        except Exception as error:
            self.stdout.write(self.style.ERROR(f'Superuser "admin" not deleted! \n Error: {error} \n {"-" * 5}'))




        for user in users_list:
            try:
                user_del = User.objects.get(username=user['username'], email=user['email'])
                user_del.delete()
                self.stdout.write(self.style.SUCCESS(f'User \"{user["username"]}\" deleted successfully!'))
            except Exception as error:
                self.stdout.write(self.style.ERROR(f'User \"{user["username"]}\" not deleted! \n Error: {error} \n {"-" * 5}'))

