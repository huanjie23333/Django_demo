from django.test import TestCase
from django.urls import reverse

from nav.models import Category
from quark.tests.base import WithDataTestCase


class WebViewTestCase(WithDataTestCase):
    def test_can_get_index_view(self):
        res = self.client.get(reverse('web_index'))
        self.assertIs(res.status_code, 200)
        self.assertTemplateUsed(res, 'web/index.html')

    def test_can_get_category_view(self):
        cate = Category.objects.all()[0]
        url = reverse('category_page', args=[cate.ename])
        res = self.client.get(url)
        self.assertIs(res.status_code, 200)
        self.assertTemplateUsed(res, 'web/category.html')

    def test_can_get_sitmap(self):
        res = self.client.get(reverse('web_sitemap'))
        self.assertIs(res.status_code, 200)
        self.assertTemplateUsed(res, 'web/sitemap.html')
