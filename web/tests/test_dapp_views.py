from django.test import TestCase
from django.urls import reverse


class TestDappViewTestCase(TestCase):
    def test_dapp_list_view(self):
        resp = self.client.get(reverse('dapp:list'))
        self.assertEqual(resp.status_code, 404)
        self.assertTemplateUsed(resp, 'web/')

