# Todolist
____

## Todolist - приложение, для планирования задач и отметки их выполнения.
____


### Задача: 
**Научиться использовать DRF на примере создания todo приложения. Отделить фронтенд от бэка.**

### Технологиии:
#### **Бэк.** 
- Django
- DRF

#### **Фронт.** 
- React
____

### Начать использовать
____

1. Создать виртуальное окружение 
```
python3 -m vene venv
```
2. Активировать виртуальное окружение
```
source venv/bin/activate
```
3. Склонировать репозиторий
``` 
git clone https://github.com/ivg97/Todolist.git
```
4. Установить зависимости
```
pip install -r requirements.txt
```
5. Создать миграции
```
python3 manage.py makemigrations
python3 manage.py migrate
```
6. Создать суперпользователя
```
python3 manage.py createuserstemplate
```
или 
```
python3 manage.py createsuperuser
```
7. Запустить проект
```
python3 manage.py runserver
```
____

### Дополнительные команды 
____

- 1. Создать тестового суперпользователя и тестовых пользователей.

``` 
python3 manage.py createuserstemplate
```
**Результат**
В БД создается суперпользователь "admin" с паролем "admin".
Создаются пользователи: "Alex", "Maks", "Anastasiya" и "I" с соответствующими паролями: "alex1234", "maks1234", "anastaiya1234" и "iiii1234".
У каждого созданного пользователя есть email с адресом(на примере Alex): "alex@mail.ru"

- 2. Удалить тестового суперпользователя и тестовых пользователей.

```
python3 manage.py deleteuserstamplate
```
____

### Документация по API
____

#### Список всех путей api
``` localhost:8000/api/ ```

