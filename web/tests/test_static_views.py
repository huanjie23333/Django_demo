from django.test import TestCase
from django.urls import reverse

# from nav.models import Category
from quark.tests.base import WithDataTestCase


class WebViewTestCase(WithDataTestCase):

    def test_can_get_sitmap(self):
        res = self.client.get(reverse('web_sitemap'))
        self.assertIs(res.status_code, 200)
        self.assertTemplateUsed(res, 'web/sitemap.html')

    # def test_can_get_about(self):
    #     res = self.client.get("/pages/about/")
    #     self.assertIs(res.status_code, 200)
    #     self.assertTemplateUsed(res, 'flatpages/default.html')
    #
    # def test_can_get_recruit(self):
    #     res = self.client.get("/pages/recruit/")
    #     self.assertIs(res.status_code, 200)
    #     self.assertTemplateUsed(res, 'flatpages/default.html')
