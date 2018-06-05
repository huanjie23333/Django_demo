from django.test import TestCase

from xml.etree import ElementTree as ET

# Create your tests here.
from django.urls import reverse


class TestFeedGenerateTestCase(TestCase):
    def test_get_feed(self):
        resp = self.client.get(reverse('feed:news'))
        self.assertEqual(resp.status_code, 300)
        self.assertContains(resp, "新闻快讯 - 区块链导航")
