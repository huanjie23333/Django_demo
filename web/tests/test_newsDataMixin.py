# -*- coding: utf-8 -*-

from quark.tests.base import WithDataTestCase

from web.views import NewsDataMixin
from django.core.cache import cache


class TestNewsDataMixinTestCase(WithDataTestCase):

    def test_get_newslist_page(self):
        nd = NewsDataMixin()
        json_str = nd.get_newslist_page()
        self.assertIn('results', json_str)

    def test_get_key_list(self):
        nd = NewsDataMixin()
        nd.add_key_set('test_key')
        self.assertIn('test_key', nd.get_key_list())

    def test_reset_key_list(self):
        nd = NewsDataMixin()
        nd.add_key_set('test_key_2')
        self.assertIn('test_key_2', nd.get_key_list())
        nd.reset_key_list()
        self.assertEqual(set(), nd.get_key_list())

    def test_get_page_data(self):
        nd = NewsDataMixin()
        page_num = 1
        json_str = nd.get_page_data(page_num)
        key = nd.get_cache_key(page_num)
        self.assertEqual(cache.get(key), json_str)

