from django.test import TestCase
from django.urls import reverse

from nav.models import Nav
from quark.tests.base import WithDataTestCase


class TestNavCategoryViewCase(WithDataTestCase):

    def test_category_view(self):
        resp = self.client.get(reverse('category_page', args=[self.cate1.ename,] ))
        self.assertEqual(resp.status_code, 200)
        self.assertTemplateUsed(resp, 'web/category.html')

    def test_category_tag_view(self):
        resp = self.client.get(reverse('category_page', args=[self.cate1.ename,]) + '?t=tag1')
        self.assertEqual(resp.status_code, 200)
        self.assertTemplateUsed(resp, 'web/category_tag.html')
