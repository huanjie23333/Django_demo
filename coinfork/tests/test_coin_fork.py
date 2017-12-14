from django.test import TestCase
from django.urls import reverse
from factory.django import DjangoModelFactory
from faker import Faker
import factory

f = Faker()


from coinfork.models import CoinFork


class CoinForkFactory(DjangoModelFactory):
    class Meta:
        model = CoinFork
        django_get_or_create = ('fork_name',)


class TestCoinForkCase(TestCase):
    def setUp(self):
        self.fork_name = f.word()
        self.fork = CoinForkFactory(
            coin_ename= 'bitcoin',
            coin_name= f.name(),
            fork_name = self.fork_name,
            fork_alias = f.name(),
            fork_ename = f.name(),
            status = 'incoming',
            block_mining_time = 0.4,
            fork_height = 499999,
        )

    def test_fork_list_page(self):
        resp = self.client.get(reverse('web_fork_list'))
        self.assertEqual(resp.status_code, 200)
        self.assertTemplateUsed('web/fork_list.html')
        self.assertContains(resp, self.fork_name)