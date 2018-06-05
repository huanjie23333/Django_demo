from django.contrib.auth.models import User
from django.urls import reverse
from factory.django import DjangoModelFactory
from faker import Faker
from rest_framework import status
from rest_framework.reverse import reverse
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase
from flink.models import Flink

f = Faker()


class UserFactory(DjangoModelFactory):
    class Meta:
        model = User
        django_get_or_create=('email',)
    email = f.email()


class TestDquoteCase(APITestCase):

    def setUp(self):
        self.u = UserFactory()
        self.flink_name = f.name()
        self.ob1 = Flink.objects.create(
            link='https://tower.im/projects/ccb114df3913461d83e4a7b2f509790f/todos/8051b9b096314b17a50a74761b5c0ff8/',
            site_name= 'https://tower.im/projects/ccb114df3913461d83e4a7b2f509790f/todos/8051b9b096314b17a50a74761b5c0ff8/httpsu',
            score=999,
        )
        self.ob2 = Flink.objects.create(
            link='https://tower.im/projects/ccb114df3913461d83e4a7b2f509790f/todos/38043197fd3b40af9a81834a82e5b251/',
            site_name='Kobe Bryan',
            score=99999,
        )
        Flink.objects.filter(link='https://tower.im/projects/ccb114df3913461d83e4a7b2f509790f/todos/38043197fd3b40af9a81834a82e5b251/').update(score=666666)

    def test_Dquote(self):
        token, _ = Token.objects.get_or_create(user=self.u)
        self.u.is_superuser = True
        self.u.save()
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)  #Token后加空格
        _path = reverse('api:flink-list')
        res = self.client.get(
            path=_path,
        )
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(self.ob1.site_name, 'https://tower.im/projects/ccb114df3913461d83e4a7b2f509790f/todos/8051b9b096314b17a50a74761b5c0ff8/httpsu')