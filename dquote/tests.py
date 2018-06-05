from django.contrib.auth.models import User
from django.urls import reverse
from factory.django import DjangoModelFactory
from faker import Faker
from datetime import datetime
from rest_framework import status
from rest_framework.reverse import reverse
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase
from dquote.models import DQoute

f = Faker()


class UserFactory(DjangoModelFactory):
    class Meta:
        model = User
        django_get_or_create=('email',)
    email = f.email()


class TestDquoteCase(APITestCase):
    def setUp(self):
        self.u = UserFactory()
        self.dq_name = f.name
        self.ob1 = DQoute.objects.create(
            target_date=datetime.now(),
            person='字母哥',
            person_en='Giannis Antetokounmpo',
            quote='i don\'t know',
            quote_en='i don\'t know',
        )
        self.ob2 = DQoute.objects.create(
            target_date=datetime.now(),
            person='勒夫',
            person_en='love',
            quote='i don\'t know',
            quote_en='i don\'t know',
        )
        self.ob3 = DQoute.objects.get(person='字母哥')
        self.ob4 = DQoute.objects.filter(person_en='love').update(quote='hahaha', quote_en='233333333')
        self.ob5 = DQoute.objects.get(person_en='love')

    def test_Dquote(self):
        token, _ = Token.objects.get_or_create(user=self.u)
        self.u.is_superuser = True
        self.u.save()
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)  #Token后加空格
        _path = reverse('api:dqoute-list')
        res = self.client.get(
            path=_path,
        )
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(self.ob5.quote, 'hahaha')
        self.assertEqual(self.ob3.person_en, 'Giannis Antetokounmpo')