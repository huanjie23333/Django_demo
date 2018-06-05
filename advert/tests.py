from django.contrib.auth.models import User
from django.urls import reverse
from advert.models import Advertisement
from datetime import datetime
from rest_framework.reverse import reverse
from rest_framework.test import APITestCase
from rest_framework.authtoken.models import Token
from rest_framework import status
from faker import Faker
from factory.django import DjangoModelFactory

f = Faker()


class UserFactory(DjangoModelFactory):
    class Meta:
        model = User
        django_get_or_create = ("email",)
    email = f.email()


class TestAdvertCase(APITestCase):
    def setUp(self):
        self.tearDown()
        self.ad_name = f.name()
        self.u = UserFactory()
        self.obj1 = Advertisement.objects.create(
            title=f.name(),
            image='1.jpg',
            link=f.url(),
            updated_at=datetime.now(),
        )
        self.obj2 = Advertisement.objects.create(
            title=f.name(),
            image='2.jpg',
            link=f.url(),
            updated_at=datetime.now(),
        )

    def tearDown(self):
        try:
            ad = Advertisement.objects.all()
            ad.delete()
        except Advertisement.DoesNotExist:
            pass

    def test_advert(self):

        token, _ = Token.objects.get_or_create(user=self.u)
        self.u.is_superuser = True
        self.u.save()
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)
        _path = reverse('api:advertisement-list')
        res = self.client.get(
            path=_path,
        )
        self.assertEqual(res.status_code, status.HTTP_200_OK)
