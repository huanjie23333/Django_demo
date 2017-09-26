# -*- coding: UTF-8  -*-
import requests
from braces.views import StaffuserRequiredMixin, AjaxResponseMixin, JSONResponseMixin

from django.views.generic import TemplateView, View
from django.shortcuts import get_object_or_404
from django.core.cache import cache
from django.db.models import Count

from nav.models import Nav, Category
from taggit.models import TaggedItem

from django.http import HttpResponse

NEWS_LIST_KEY_SET = 'newslist:cache_key_set'


class NewsDataMixin(object):
    def get_newslist_page(self, page):
        r = requests.get('http://www.chainscoop.com/api/news.json?page=%s' % page)
        if r.status_code == 200:
            return r.text

    def get_key_list(self):
        return cache.get(NEWS_LIST_KEY_SET, [])

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
    def get_context_data(self):
        context = super(SideBarDataMixin, self).get_context_data()
        context['sidebar_news_json_str'] = self.get_page_data(1)
        return context


class CategoryView(SideBarDataMixin, TemplateView):
    template_name = 'web/category.html'

    def get_category(self):
        return get_object_or_404(Category, ename=self.ename)

    # def get_queryset(self):
    #     _queryset = super(CategoryView, self).get_queryset()
    #     _queryset = _queryset.filter(cate__ename=self.ename)
    #     return _queryset

    def get_context_data(self, **kwargs):
        context = super(CategoryView, self).get_context_data(**kwargs)
        cate = self.get_category()
        context.update({
            'category': cate,
            'cate_ename': cate.ename,
            "tag_lists": self.get_tag_for_category(cate.id)
        })
        return context

    #
    # def get_object(self):
    #     # ename = self.kwargs.get('cate_ename')
    #     return get_object_or_404(Category, ename=self.ename)
    #
    def get_tag_for_category(self, category_id, tag_range=3000, site_range=10000):
        nav_ids = list(self.get_nav_ids_by_category(category_id))
        tagids = list(TaggedItem.objects.filter(object_id__in=nav_ids, content_type_id=9) \
                      .values('tag_id', 'tag__name').annotate(tagCount=Count('tag_id')) \
                      .order_by('-tagCount'))[:tag_range]
        tag_nav_list = [{
            'tagname': obj['tag__name'],
            'navs': Nav.objects.filter(tags__id=obj['tag_id'], cate=category_id)[:site_range]
        }
            for obj in tagids]
        return tag_nav_list

    def get_nav_ids_by_category(self, category_id):
        return Nav.objects.filter(cate_id=category_id).values_list('id', flat=True)

    def get(self, request, *args, **kwargs):
        self.ename = kwargs.pop('cate_ename')
        return super().get(request, *args, **kwargs)
        # return super(CategoryView, self).get(request, *args, **kwargs)


class IndexView(SideBarDataMixin, TemplateView):
    template_name = 'web/index.html'

    def get_context_data(self, **kwargs):
        context = super(IndexView, self).get_context_data(**kwargs)
        context['recommend'] = self.get_recommend_nav()

        categories = list(Category.objects.all())

        context['categories'] = [{
            'category_name': cate.cname,
            'category_ename': cate.ename,
            'cate_tags': self.get_tag_for_category(cate.id)
        }
            for cate in categories
        ]
        return context

    def get_category_nav(self, category):
        return Nav.objects.filter(category=category)

    def get_recommend_nav(self):
        return Nav.objects.filter(score__gte=85)

    def get_tag_for_category(self, category_id, tag_range=3, site_range=20):
        nav_ids = list(self.get_nav_ids_by_category(category_id))
        tagids = list(TaggedItem.objects.filter(object_id__in=nav_ids, content_type_id=9) \
                      .values('tag_id', 'tag__name').annotate(tagCount=Count('tag_id')) \
                      .order_by('-tagCount'))
        tag_nav_list = [{
            'tagname': obj['tag__name'],
            'navs': Nav.objects.filter(tags__id=obj['tag_id'], cate=category_id)[:site_range]
        }
            for obj in tagids]
        return tag_nav_list

    def get_nav_ids_by_category(self, category_id):
        return Nav.objects.filter(cate_id=category_id).values_list('id', flat=True)


class AboutView(TemplateView):
    template_name = 'web/about.html'
    pass


class SiteMapView(TemplateView):
    template_name = 'web/sitemap.html'

    def get_context_data(self, **kwargs):
        context = super(SiteMapView, self).get_context_data(**kwargs)
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
    template_name = 'web/news.html'


class ClearNewsCacheView(StaffuserRequiredMixin, NewsDataMixin, TemplateView):
    template_name = 'web/clear_news_cache.html'

    def get_context_data(self, **kwargs):
        context = {}
        context['key_list'] = self.get_key_list()
        cache.delete_many(context['key_list'])
        self.reset_key_list()
        return context
