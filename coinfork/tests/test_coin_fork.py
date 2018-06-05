from django.contrib.auth.models import User
from django.urls import reverse
from factory.django import DjangoModelFactory
from faker import Faker
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

f = Faker()

from coinfork.models import CoinFork

class UserFactory(DjangoModelFactory):
    class Meta:
        model = User
        django_get_or_create = ("email",)
    email = f.email()


class TestCoinForkAPICase(APITestCase):
    def setUp(self):
        self.tearDown()
        self.fork_name = f.name()
        self.u = UserFactory()
        self.obj1 = CoinFork.objects.create(
            coin_ename='Bitcoin',
            coin_name=f.name(),
            fork_name=f.name(),
            fork_alias=f.name(),
            fork_ename=f.name(),
            status='incoming',
            block_mining_time=0.4,
            fork_height=499999,
        )
        self.obj2 = CoinFork.objects.create(
            coin_ename='RNB',
            coin_name=f.name(),
            fork_name=f.name(),
            fork_alias=f.name(),
            fork_ename=f.name(),
            status='incoming',
            block_mining_time=0.4,
            fork_height=999999,
        )
        self.obj3 = CoinFork.objects.create(
            coin_ename='dollar',
            coin_name=f.name(),
            fork_name=f.name(),
            fork_alias=f.name(),
            fork_ename=f.name(),
            status='incoming',
            block_mining_time=0.2,
            fork_height=99999,
        )

    def tearDown(self):
        try:
            ad = CoinFork.objects.all()
            ad.delete()
        except CoinFork.DoesNotExist:
            pass

    def test_Coinfork(self):
        token, _ = Token.objects.get_or_create(user=self.u)
        self.u.is_superuser = True
        self.u.save()
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)
        res = self.client.get(
            reverse('api:coinfork-list')
        )
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(self.obj1.status, 'incoming')
#       self.assertContains(res, self.fork_name)

    def test_404_error(self):
        resp = self.client.get('/not_exist_page/')
        self.assertEqual(resp.status_code, 404)
