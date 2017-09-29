# -*- coding: UTF-8  -*-
import json
from datetime import datetime

import requests

from braces.views import StaffuserRequiredMixin, AjaxResponseMixin, JSONResponseMixin
from taggit.models import TaggedItem

from django.views.generic import TemplateView, View, DetailView
from django.shortcuts import get_object_or_404
from django.core.cache import cache
from django.db.models import Count
from django.http import HttpResponse
from django.conf import settings

from nav.models import Nav, Category


NEWS_LIST_KEY_SET = 'newslist:cache_key_set'


class NewsDataMixin(object):

    def get_newslist_page(self, page=1):
        r = requests.get('http://www.chainscoop.com/api/news.json?page=%s' % page)
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

    def get_page_data(self, page):
        cache_key = self.get_cache_key(page)
        json_str = cache.get_or_set(cache_key, self.get_newslist_page(page), timeout=60 * 30)
        self.add_key_set(cache_key)
        return json_str

    def get_cache_key(self, page):
        cache_key = 'newslist:page:%s' % page
        return cache_key

    def get_page_num(self):
        page = self.request.GET.get('page', 1)
        page = int(page)
        assert type(page) == int
        assert 0 < page <= 30000
        return page


class SideBarDataMixin(NewsDataMixin):

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['sidebar_news_json_str'] = self.get_page_data(1)
        return context


class CategoryTagDataMixin(object):

    def get_tag_for_category(self, category_id, tag_range=3000, site_range=10000):
        nav_ids = list(self.get_nav_ids_by_category(category_id))
        tagids = list(TaggedItem.objects.filter(object_id__in=nav_ids, content_type_id=9) \
                      .values('tag_id', 'tag__name').annotate(tagCount=Count('tag_id')) \
                      .order_by('-tagCount'))[:tag_range]
        tag_nav_list = [{
            'tagname': obj['tag__name'],
            'navs': Nav.objects.filter(tags__id=obj['tag_id'], cate=category_id, status=Nav.STATUS.published)[:site_range]
        }
            for obj in tagids]
        return tag_nav_list

    def get_nav_ids_by_category(self, category_id):
        return Nav.objects.filter(cate_id=category_id, status=Nav.STATUS.published).values_list('id', flat=True)


class CategoryView(CategoryTagDataMixin, SideBarDataMixin, TemplateView):
    template_name = 'web/category.html'

    def get_category(self):
        return get_object_or_404(Category, ename=self.ename)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        cate = self.get_category()
        context.update({
            'category': cate,
            'cate_ename': cate.ename,
            "tag_lists": self.get_tag_for_category(cate.id, tag_range=3000, site_range=10000 )
        })
        return context

    def get(self, request, *args, **kwargs):
        self.ename = kwargs.pop('cate_ename')
        return super().get(request, *args, **kwargs)


class IndexView(CategoryTagDataMixin, SideBarDataMixin, TemplateView):
    template_name = 'web/index.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['recommend'] = self.get_recommend_nav()

        categories = list(Category.objects.all())

        context['categories'] = [{
            'category_name': cate.cname,
            'category_ename': cate.ename,
            'cate_tags': self.get_tag_for_category(cate.id, tag_range=50, site_range=20)
        }
            for cate in categories
        ]
        return context

    def get_recommend_nav(self):
        return Nav.objects.filter(score__gte=85, status=Nav.STATUS.published)


class AboutView(TemplateView):
    template_name = 'web/about.html'


class SiteMapView(TemplateView):
    template_name = 'web/sitemap.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['category_tag_list'] = self.get_all_tag_list()
        return context

    def get_all_tag_list(self):
        categories = Category.objects.all()
        return [{
            'catename': cate.cname,
            'cateename': cate.ename,
            'tag_list': self.get_cate_tag_list(cate.id)
        } for cate in categories]

    def get_cate_tag_list(self, category_id):
        nav_ids = list(self.get_nav_ids_by_category(category_id))
        tagids = list(TaggedItem.objects.filter(object_id__in=nav_ids) \
                      .values('tag_id', 'tag__name').annotate(tagCount=Count('tag_id')) \
                      .order_by('-tagCount'))
        return tagids

    def get_nav_ids_by_category(self, category_id):
        return Nav.objects.filter(cate_id=category_id).values_list('id', flat=True)


# view for testing 500 page.
class ErrorView(StaffuserRequiredMixin, TemplateView):
    def get(self, request):
        raise Exception('error for test')


class NewsApiView(AjaxResponseMixin, JSONResponseMixin, NewsDataMixin, View):
    # def get(self,request):
    #     return self.get_ajax(request)

    def get_ajax(self, request, *args, **kwargs):
        page = self.get_page_num()
        json_str = self.get_page_data(page)
        # save yout keys set here, so you can clear them at once

        return HttpResponse(json_str,
                            content_type=self.get_content_type(),
                            status=200)


class NewsListView(SideBarDataMixin, TemplateView):
    template_name = 'web/news_list.html'


class ClearNewsCacheView(StaffuserRequiredMixin, NewsDataMixin, TemplateView):
    template_name = 'web/clear_news_cache.html'

    def get_context_data(self, **kwargs):
        context = {}
        context['key_list'] = self.get_key_list()
        cache.delete_many(context['key_list'])
        self.reset_key_list()
        return context

class NewsDetailView(SideBarDataMixin, DetailView ):
    context_object_name = 'news'
    template_name = 'web/news.html'

    def format_time(self, time_stamp):
        return datetime.fromtimestamp(int(time_stamp))


    def get_object(self, queryset=None):
        slug = self.kwargs.get('slug')
        r = requests.get("%s%s" %(settings.NEWS_DETAIL_API, slug))
        if r.status_code == 200 :
            obj =  json.loads(r.text)
            obj['published_time'] = self.format_time(obj['published_at'])
            return obj
        else:
            return None


