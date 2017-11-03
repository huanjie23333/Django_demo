from django.test import TestCase
from django.urls import reverse


class TestWebToolsViewsTestCase(TestCase):
    def test_coin_list_view(self):
        resp = self.client.get(reverse('tools:coin_list'))
        self.assertEqual(resp.status_code, 200)
        self.assertContains(resp, 'BTC')
        self.assertContains(resp, 'ETH')
        self.assertTemplateUsed('webtools/coin_list.html')
