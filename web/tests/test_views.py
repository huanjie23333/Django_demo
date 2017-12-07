import logging

from django.test import TestCase
from django.urls import reverse

from nav.models import Nav
from quark.tests.base import WithDataTestCase

from web.views import SideBarDataMixin
from web.views.news import NewsDataMixin


logging.disable(logging.CRITICAL)

class TestCategoryViewTestCase(WithDataTestCase):
    def test_get_category(self):
        resp = self.client.get(reverse('category_page', args=[self.cate1.ename]))
        self.assertEqual(resp.status_code, 200)
        self.assertTemplateUsed(resp, 'web/category.html')
        print('=' * 80)
        print(resp.context_data)
        print('=' * 80)
        self.assertContains(response=resp, text='foo')
        # self.assertContains(response=resp, text='tag1')
        # self.assertContains(response=resp, text='tag2')


class TestIndexViewTestCase(WithDataTestCase):
    def test_get_index(self):
        resp = self.client.get(reverse('web_index'))
        self.assertEqual(resp.status_code, 200)
        # self.assertTemplateUsed(resp, 'web/index.html')

        # self.assertContains(resp, text='tag1')
        # self.assertContains(resp, text='tag2')
        # self.assertContains(resp, text='tag4')
        # self.assertContains(resp, text='tag3')

        self.assertContains(resp, text='finance_cname')
        self.assertContains(resp, text='media_cname')

        # self.assertContains(resp, 'foo')
        # self.assertContains(resp, 'nav2')

        self.assertContains(resp, '/category/finance.htm')


class TestNewsListViewTestCase(WithDataTestCase):
    def test_get_newslist(self):
        resp = self.client.get(reverse('web_news'))
        self.assertEqual(resp.status_code, 200)
        self.assertTemplateUsed(resp, 'web/news_list.html')
        self.assertContains(resp, "news_obj")


class TestNewsDetailViewTestCase(TestCase):
    def test_get_newslist(self):
        resp = self.client.get(reverse('news:detail', args=['647056354412', ]), )
        self.assertEqual(resp.status_code, 200)
        self.assertTemplateUsed(resp, 'web/news.html')


class TestClearNewsCacheViewTestCase(WithDataTestCase):
    def test_get_clear_cache_page(self):
        self.create_user()
        self.client.login(username=self.username, password=self.password)
        resp = self.client.get(reverse('news:clear'))
        self.assertEqual(resp.status_code, 200)
        self.assertTemplateUsed(resp, 'web/clear_news_cache.html')


class TestNewsApiViewTestCase(WithDataTestCase):
    def test_api_get(self):
        resp = self.client.get(reverse('news:json_list'), HTTP_X_REQUESTED_WITH='XMLHttpRequest')
        self.assertEqual(resp.status_code, 200)
        self.assertContains(resp, 'published_at')


class TestIndexDraftNavTestCase(WithDataTestCase):
    def test_draf_nav_not_shown(self):
        d_nav = Nav.objects.create(cname='draft_nav_cn',
                                   ename='draft_nav_en',
                                   cate=self.cate1,
                                   location='china',
                                   status=Nav.STATUS.draft
                                   )

        d_nav2 = Nav.objects.create(cname='published_nav_cn',
                                    ename='published_nav_en',
                                    location='china',
                                    status=Nav.STATUS.published,
                                    cate=self.cate1)

        # d_nav.tags.add('tag_new')
        # d_nav2.tags.add('tag_new')

        d_nav.save()
        d_nav2.save()

        resp = self.client.get(reverse('web_index'))
        # print(resp.body)
        self.assertEqual(resp.status_code, 200)
        self.assertTemplateUsed(resp, 'web/index.html')
        # self.assertContains(resp, text='tag_new')
        # self.assertContains(resp, text='published_nav_cn')
        self.assertNotContains(resp, text='draft_nav_cn')


class TestSidebarDataMixin(TestCase):
    def test_can_get_news_tags(self):
        sd = SideBarDataMixin()
        tag_list = sd.get_news_tag_list()
        self.assertIsInstance(tag_list, list)
        self.assertNotEqual(len(tag_list), 0)
