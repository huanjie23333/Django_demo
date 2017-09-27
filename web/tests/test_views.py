from django.test import TestCase
from django.urls import reverse

from quark.tests.base import WithDataTestCase
from django.contrib.auth.models import User

from web.views import NewsDataMixin


class TestCategoryViewTestCase(WithDataTestCase):

    def test_get_category(self):
        resp = self.client.get(reverse('category_page', args=[self.cate1.ename]))
        self.assertEqual(resp.status_code, 200)
        self.assertTemplateUsed(resp ,'web/category.html')
        self.assertContains(response=resp, text='foo')
        self.assertContains(response=resp, text='tag1')
        self.assertContains(response=resp, text='tag2')



class TestIndexViewTestCase(WithDataTestCase):

    def test_get_index(self):
        resp = self.client.get(reverse('web_index'))
        self.assertEqual(resp.status_code, 200)
        self.assertTemplateUsed(resp, 'web/index.html')
        self.assertContains(resp, text='tag1')
        self.assertContains(resp, text='tag2')
        self.assertContains(resp, text='tag4')
        self.assertContains(resp, text='tag3')

        self.assertContains(resp, text='finance_cname')
        self.assertContains(resp, text='media_cname')

        self.assertContains(resp, 'foo')
        self.assertContains(resp, 'nav2')

        self.assertContains(resp, '/category/finance.htm')


class TestNewsListViewTestCase(WithDataTestCase):

    def test_get_newslist(self):
        resp = self.client.get(reverse('web_news'))
        self.assertEqual(resp.status_code, 200)
        self.assertTemplateUsed('web/news2.html')
        nd = NewsDataMixin()
        jsonstr = nd.get_newslist_page(1)
        self.assertContains(resp, jsonstr)


class TestClearNewsCacheViewTestCase(WithDataTestCase):

    def test_get_clear_cache_page(self):
        self.create_user()
        self.client.login(username=self.username, password=self.password)
        resp = self.client.get(reverse('news:clear'))
        self.assertEqual(resp.status_code, 200)
        self.assertTemplateUsed(resp, 'web/clear_news_cache.html')


class TestNewsApiViewTestCase(WithDataTestCase):
    def test_api_get(self):
        resp = self.client.get(reverse('news:list'), HTTP_X_REQUESTED_WITH='XMLHttpRequest')
        self.assertEqual(resp.status_code, 200)
        self.assertContains(resp, 'www.chainscoop.com')




