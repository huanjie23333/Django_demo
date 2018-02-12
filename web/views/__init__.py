# -*- coding: UTF-8  -*-
import requests
from braces.views import StaffuserRequiredMixin
from django.core.cache import cache
from django.urls import reverse_lazy
from django.utils.cache import patch_response_headers
from taggit.models import TaggedItem, Tag

from django.views.generic import TemplateView, View, ListView, CreateView
from django.shortcuts import get_object_or_404
from django.db.models import Count
from django.http import HttpResponseForbidden

from coinfork.models import CoinFork
from flink.views import FlinkMixin
from nav.models import Nav, Category, SubNav
from nav.forms import SubNavModelForm
from web.views.news import SideBarDataMixin
from haystack.query import SearchQuerySet
from django.shortcuts import redirect

import logging

logger = logging.getLogger('django')


class SqsCategoryTagDataMixin(object):
    def _get_category_list(self):
        categories = list(Category.objects.all())
        return [{
            'category_name': cate.cname,
            'category_ename': cate.ename,
            'cate_tags': self.get_tag_for_category(cate.id, tag_range=50, site_range=20),
        }
            for cate in categories
        ]

    def get_category_list(self):
        key = "category:tag:nav:list"
        return cache.get_or_set(key, self._get_category_list, 5 * 60)

    def get_cate_tag_navs(self, cate_id, tag_name):
        return SearchQuerySet().filter(cate_id=cate_id, tags=tag_name).order_by("-rank")[:20]

    def get_tag_for_category(self, cate_id, tag_range=20, site_range=50):
        sqs = SearchQuerySet().filter(cate_id=cate_id).facet("tags")
        tag_nav_list = list()
        try:
            tags = sqs.facet_counts()["fields"]["tags"][:tag_range]
        except KeyError as e:
            return tag_nav_list

            # logger.info(e.message)
        for (tag, count) in tags:
            tag_nav_list.append({
                'tagname': tag,
                'navs': self.get_cate_tag_navs(cate_id, tag)
            })
        return tag_nav_list


class CategoryTagDataMixin(object):

    def get_nav_for_cate_tag(self, category, tag_name):
        tag = get_object_or_404(Tag, name=tag_name)
        navs = TaggedItem.objects.filter(tag_id=tag.id, content_type_id=9).values_list('object_id', flat=True)
        navs = Nav.objects.filter(id__in=navs, cate=category, status=Nav.STATUS.published).order_by('-score')
        return navs

    def get_tag_for_category(self, category_id, tag_range=3000, site_range=10000):
        nav_ids = self.get_nav_ids_by_category(category_id)
        tagids = list(TaggedItem.objects.filter(object_id__in=nav_ids, content_type_id=9) \
                      .values('tag_id', 'tag__name').annotate(tagCount=Count('tag_id')) \
                      .order_by('-tagCount'))[:tag_range]
        tag_nav_list = [{
            'tagname': obj['tag__name'],
            'navs': Nav.objects.filter(tags__id=obj['tag_id'],
                                       cate=category_id,
                                       status=Nav.STATUS.published)[
                    :site_range]
        }
            for obj in tagids]
        return tag_nav_list

    def get_nav_ids_by_category(self, category_id):
        return Nav.objects.filter(cate_id=category_id,
                                  status=Nav.STATUS.published).values_list('id', flat=True)


class CategoryView(CategoryTagDataMixin, SideBarDataMixin, TemplateView):
    def get_template_names(self):
        if self.tagname:
            return 'web/category_tag.html'
        else:
            return 'web/category.html'

    def get_category(self):
        return get_object_or_404(Category, ename=self.ename)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        cate = self.get_category()
        if self.tagname:
            context.update({
                'cate': cate,
                'navs': self.get_nav_for_cate_tag(cate, self.tagname),
                'tag_name': self.tagname
            })
        else:
            context.update({
                'category': cate,
                'cate_ename': cate.ename,
                "tag_lists": self.get_tag_for_category(cate.id, tag_range=3000, site_range=10000)
            })
        return context

    def get(self, request, *args, **kwargs):
        self.ename = kwargs.pop('cate_ename')
        self.tagname = request.GET.get('t', None)
        return super().get(request, *args, **kwargs)



class IndexView(SqsCategoryTagDataMixin, SideBarDataMixin, TemplateView):
    template_name = 'web/index.html'

    def get(self, request, **kwargs):
        resp = super().get(request, **kwargs)
        patch_response_headers(resp, cache_timeout=300)
        return resp

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['recommend'] = self.get_recommend_nav()
        context['categories'] = self.get_category_list()
        return context

    def get_recommend_nav(self):
        return Nav.objects.filter(score__gte=85, status=Nav.STATUS.published)


class SubNavCreateView(CreateView):
    template_name = 'web/submit.html'
    model = SubNav
    form_class = SubNavModelForm
    success_url = reverse_lazy('web_submit_done')

    def get_form_kwargs(self):
        kwargs = super().get_form_kwargs()
        kwargs.update({
            "request": self.request,
        })
        return kwargs


class SubNavSuccessView(TemplateView):
    http_method_names = ['head', 'get']
    template_name = 'web/sub_nav_success.html'

    def get(self, request, *args, **kwargs):
        referer = request.META.get('HTTP_REFERER')
        if not referer:
            return HttpResponseForbidden()
        return super().get(request, *args, **kwargs)


class SiteMapView(SideBarDataMixin, TemplateView):
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
        tagids = list(TaggedItem.objects.filter(object_id__in=nav_ids, content_type_id=9) \
                      .values('tag_id', 'tag__name').annotate(tagCount=Count('tag_id')) \
                      .order_by('-tagCount'))
        return tagids

    def get_nav_ids_by_category(self, category_id):
        return Nav.objects.filter(cate_id=category_id).values_list('id', flat=True)


# view for testing 500 page.
class ErrorView(StaffuserRequiredMixin, TemplateView):
    def get(self, request, *args, **kwargs):
        raise Exception('error for test')




class ForkListView(FlinkMixin, ListView):
    http_method_names = ['get', 'head']
    template_name = 'web/fork_list.html'
    model = CoinFork
    queryset = CoinFork.objects.all()
    paginate_by = 100
    context_object_name = 'fork_list'

    def get_queryset(self):
        if self.fork_status:
            return CoinFork.objects.filter(status=self.fork_status).exclude(status='removed')
        else:
            return CoinFork.objects.all().exclude(status='removed')

    def get_context_data(self, **kwargs):
        context = super().get_context_data()
        if self.fork_status:
            context['status'] = self.fork_status
        return context

    def get(self, request, *args, **kwargs):
        self.fork_status = request.GET.get('status', None)
        if self.fork_status:
            assert (self.fork_status in ['incoming', 'done'])
        return super().get(request, *args, **kwargs)

class CountDownList(View):
    def get(self,request):
        return redirect('web_fork_list', permanent=True)


class D3TestView(FlinkMixin, TemplateView):
    template_name = 'web/tools/d3_test.html'


class APIDataCacheMixin(object):
    def get_api_url(self):
        return self.api_url

    def get_api_data(self):
        key = "api:data:%s" % self.get_api_url()
        return cache.get_or_set(key, self._get_api_data(), timeout=3600)

    def _get_api_data(self):
        return requests.get(self.get_api_url()).text


class CryptoindexView(APIDataCacheMixin, FlinkMixin, TemplateView):
    template_name = 'web/tools/crypto_Index.html'
    api_url = 'http://crix.hu-berlin.de/data/crix.json'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context.update({
            'crypto_index': self.get_api_data()
        })
        return context
