# -*- coding: UTF-8  -*-
import json
from datetime import datetime

import requests

from braces.views import StaffuserRequiredMixin, AjaxResponseMixin, JSONResponseMixin

from django.views.generic import TemplateView, View, DetailView, ListView
from django.core.cache import cache
from django.http import HttpResponse

from coinfork.models import CoinFork
from flink.views import FlinkMixin
from nav.models import Nav

NEWS_LIST_KEY_SET = 'newslist:cache_key_set'
NEWS_TAG_LIST_KEY = 'newslist:tags:list'
NEWS_TAG_API_URL = 'http://www.chainnews.com/api/news/tags.json'
NEWS_DETAIL_API = 'http://www.chainnews.com/api/news/'


class NewsDataMixin(object):
    def _get_newslist_page(self, page=1, tag=None):
        url = 'http://www.chainnews.com/api/news.json?page={page}'.format(page=page)
        if tag:
            url = "%s&tag=%s" % (url, tag)
        r = requests.get(url)
        if r.status_code == 200:
            return r.text
        else:
            return None

    def get_newslist_key_set(self):
        return cache.get(NEWS_LIST_KEY_SET, set())

    def reset_newslist_key_set(self):
        return cache.delete(NEWS_LIST_KEY_SET)

    def add_key_set(self, cache_key):
        cache_key_set = cache.get_or_set(NEWS_LIST_KEY_SET, set(), timeout=None)
        cache_key_set.add(cache_key)
        cache.set(NEWS_LIST_KEY_SET, cache_key_set, timeout=None)

    def get_news_page_data_json(self, page=1, tag=None):
        cache_key = self.get_cache_key(page, tag)
        json_str = cache.get_or_set(cache_key, self._get_newslist_page(page, tag), timeout=60 * 30)
        try:
            data = json.loads(json_str)
        except Exception as e:
            return json.dumps({})

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
            cache_key = "%s:%s" % (cache_key, tag)
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
        result = cache.get_or_set(NEWS_TAG_LIST_KEY, self._get_news_tag_list(), timeout=60 * 30)
        if result is not None and len(result) == 0:
            cache.delete(NEWS_TAG_LIST_KEY)
        return result

    def _get_news_tag_list(self):
        tag_list = []
        try:
            r = requests.get(NEWS_TAG_API_URL)
            if r.status_code == 200:
                tag_list = r.json()['tags']
            else:
                return None
        except Exception:
            pass
        finally:
            return tag_list

    def get_news_detail(self, slug):
        key = self.get_news_detail_key(slug)
        return cache.get_or_set(key, self._get_news_detail(slug), timeout=60 * 30)

    def _get_news_detail(self, slug):
        r = requests.get("%s%s" % (NEWS_DETAIL_API, slug))
        if r.status_code == 200:
            obj = json.loads(r.text)
            obj['published_time'] = self.format_time(obj['published_at'])
            return obj
        else:
            return None

    def get_news_detail_key(self, slug):
        return 'news:detail:%s' % slug


from nav.block_chain_browsers import block_chain_browsers


class SideBarDataMixin(FlinkMixin, NewsDataMixin):
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        sb_t_list = self.get_news_tag_list()[:50]
        context.update({
            'sidebar_news_tag_list': sb_t_list,
            'sidebar_news_tag_list_json': json.dumps(sb_t_list),
            'sidebar_news_list': self.get_news_page_list(),
            'sidebar_bcinfo_list': self.get_bc_info_list(),
            'sidebar_fork': self.get_sidebar_fork()
        })
        return context

    def get_sidebar_fork(self):
        try:
            return CoinFork.objects.filter(status='incoming', fork_height__gt=1).order_by('fork_height')[0]
        except IndexError as e:
            return []

    def get_bc_info_list(self):
        bc_info_list = {}
        for name, id in block_chain_browsers.items():
            try:
                bc_info_list[name] = Nav.objects.get(pk=id)
            except Nav.DoesNotExist as e:
                pass
        return bc_info_list


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
        context['news_list'] = self.get_news_page_list()
        context['news_json_str'] = self.get_news_page_data_json(1)
        return context


class NewsTagListView(SideBarDataMixin, TemplateView):
    template_name = 'web/news_list.html'

    def get_tag(self):
        return self.kwargs.get('tag', None)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        tag = context['current_tag'] = self.get_tag()
        context['news_list'] = self.get_news_page_list(tag=tag)
        context['news_json_str'] = self.get_news_page_data_json(1, tag=tag)
        return context


class ClearNewsCacheView(StaffuserRequiredMixin, NewsDataMixin, TemplateView):
    template_name = 'web/clear_news_cache.html'

    def get_context_data(self, **kwargs):
        context = {}
        context['key_list'] = self.get_newslist_key_set()
        cache.delete_many(context['key_list'])
        self.reset_newslist_key_set()
        return context


class NewsDetailView(SideBarDataMixin, DetailView):
    context_object_name = 'news'
    template_name = 'web/news.html'

    def format_time(self, time_stamp):
        return datetime.fromtimestamp(int(time_stamp))

    def get_object(self, queryset=None):
        slug = self.kwargs.get('slug')
        return self.get_news_detail(slug)
