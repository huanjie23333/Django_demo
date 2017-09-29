from django.test import TestCase
from django.urls import reverse


class TestDappViewTestCase(TestCase):
    def test_dapp_list_view(self):
        resp = self.client(reverse('dapp:list'))
