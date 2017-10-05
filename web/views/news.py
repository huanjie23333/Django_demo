# -*- coding: UTF-8  -*-
import json
from datetime import datetime

import requests

from braces.views import StaffuserRequiredMixin, AjaxResponseMixin, JSONResponseMixin
from taggit.models import TaggedItem

from django.views.generic import TemplateView, View, DetailView, ListView
from django.shortcuts import get_object_or_404
from django.core.cache import cache
from django.db.models import Count
from django.http import HttpResponse
from django.conf import settings

from nav.models import Nav, Category

NEWS_LIST_KEY_SET = 'newslist:cache_key_set'
NEWS_TAG_LIST_KEY = 'newslist:tags:list'
NEWS_TAG_API_URL = 'http://www.chainscoop.com/api/news/tags.json'

class NewsDataMixin(object):

    def _get_newslist_page(self, page=1, tag=None):
        url = 'http://www.chainscoop.com/api/news.json?page=%s' % page
        if tag:
            url = "%s&tag=%s"%(url,tag)
        r = requests.get(url)
        if r.status_code == 200:
            return r.text

    def get_key_list(self):
        return cache.get(NEWS_LIST_KEY_SET, set())

    def reset_key_list(self):
        return cache.delete(NEWS_LIST_KEY_SET)

    def add_key_set(self, cache_key):
        cache_key_set = cache.get_or_set(NEWS_LIST_KEY_SET, set(), timeout=None)
        cache_key_set.add(cache_key)
        cache.set(NEWS_LIST_KEY_SET, cache_key_set, timeout=None)

    def get_news_page_data_json(self, page=1, tag=None):
        cache_key = self.get_cache_key(page, tag)
        json_str = cache.get_or_set(cache_key, self._get_newslist_page(page, tag), timeout=60 * 30)
        self.add_key_set(cache_key)
        return json_str

    def get_news_page_list(self, page=1, tag=None):
        result = []
        try:
            result = json.loads(self.get_news_page_data_json(page, tag))['results']
        except KeyError:
            pass
        finally:
            return result


    def get_cache_key(self, page=1, tag=None):
        cache_key = 'newslist:page:%s' % page
        if tag:
            cache_key = "%s:%s" %(cache_key, tag)
        return cache_key

    def get_page_num(self):
        page = self.request.GET.get('page', 1)
        page = int(page)
        assert type(page) == int
        assert 0 < page <= 30000
        return page

    def get_tag(self):
        return self.request.GET.get('tag', None)

    def get_news_tag_list(self):
        return  cache.get_or_set(NEWS_TAG_LIST_KEY, self._get_news_tag_list(), timeout=60*30)

    def _get_news_tag_list(self):
        tag_list = []
        try:
            r = requests.get(NEWS_TAG_API_URL)
            if r.status_code == 200:
                tag_list = r.json()['tags']
        except Exception:
            pass
        finally:
            return tag_list


class SideBarDataMixin(NewsDataMixin):
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['sidebar_news_tag_list'] = self.get_news_tag_list()
        context['sidebar_news_tag_list_json'] = json.dumps(context['sidebar_news_tag_list'])
        context['sidebar_news_list'] = self.get_news_page_list()
        return context



class NewsApiView(AjaxResponseMixin, JSONResponseMixin, NewsDataMixin, View):
    # def get(self,request):
    #     return self.get_ajax(request)

    def get_ajax(self, request, *args, **kwargs):
        page = self.get_page_num()
        tag = self.get_tag()
        json_str = self.get_news_page_data_json(page, tag=tag)

        return HttpResponse(json_str,
                            content_type=self.get_content_type(),
                            status=200)


class NewsListView(SideBarDataMixin, TemplateView):
    template_name = 'web/news_list.html'
    context_object_name = 'news_list'
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['news_list'] =  self.get_news_page_list()
        context['news_json_str'] = self.get_news_page_data_json(1)
        return context


class NewsTagListView(SideBarDataMixin, TemplateView):
    template_name = 'web/news_list.html'
    def get_tag(self):
        return self.kwargs.get('tag', None)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        tag = context['current_tag'] = self.get_tag()
        context['news_list'] =  self.get_news_page_list(tag=tag)
        context['news_json_str'] = self.get_news_page_data_json(1, tag=tag)

        return context


class ClearNewsCacheView(StaffuserRequiredMixin, NewsDataMixin, TemplateView):
    template_name = 'web/clear_news_cache.html'

    def get_context_data(self, **kwargs):
        context = {}
        context['key_list'] = self.get_key_list()
        cache.delete_many(context['key_list'])
        self.reset_key_list()
        return context


class NewsDetailView(SideBarDataMixin, DetailView):
    context_object_name = 'news'
    template_name = 'web/news.html'

    def format_time(self, time_stamp):
        return datetime.fromtimestamp(int(time_stamp))

    def get_object(self, queryset=None):
        slug = self.kwargs.get('slug')
        r = requests.get("%s%s" % (settings.NEWS_DETAIL_API, slug))
        if r.status_code == 200:
            obj = json.loads(r.text)
            obj['published_time'] = self.format_time(obj['published_at'])
            return obj
        else:
            return None


