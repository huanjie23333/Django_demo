from django.test import TestCase
from django.urls import reverse


class TestWebToolsViewsTestCase(TestCase):
    def setUp(self):
        self.fetch_url = "https://bitcoin.org/zh_CN/"
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:28.0) Gecko/20100101 Firefox/28.0',
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'X-Requested-With': 'XMLHttpRequest'
        }

    def test_coin_list_view(self):
        resp = self.client.get(reverse('tools:coin_list'))
        self.assertEqual(resp.status_code, 200)
        self.assertContains(resp, 'BTC')
        self.assertContains(resp, 'ETH')
        self.assertTemplateUsed('webtools/coin_list.html')

    def test_fetch_site_view(self):
        _uri = "{uri}?url={url}".format(uri=reverse('tools:fetch_web_site'), url=self.fetch_url)
        r = self.client.get(_uri, headers=self.headers)
        self.assertEqual(r.status_code, 200)

