# -*- coding: UTF-8  -*-
from braces.views import StaffuserRequiredMixin, AjaxResponseMixin, JSONResponseMixin
from taggit.models import TaggedItem

from django.views.generic import TemplateView, View, DetailView, ListView
from django.shortcuts import get_object_or_404
from django.db.models import Count

from nav.models import Nav, Category
from web.views.news import SideBarDataMixin


class CategoryTagDataMixin(object):
    def get_tag_for_category(self, category_id, tag_range=3000, site_range=10000):
        nav_ids = list(self.get_nav_ids_by_category(category_id))
        tagids = list(TaggedItem.objects.filter(object_id__in=nav_ids, content_type_id=9) \
                      .values('tag_id', 'tag__name').annotate(tagCount=Count('tag_id')) \
                      .order_by('-tagCount'))[:tag_range]
        tag_nav_list = [{
            'tagname': obj['tag__name'],
            'navs': Nav.objects.filter(tags__id=obj['tag_id'], cate=category_id, status=Nav.STATUS.published)[
                    :site_range]
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
            "tag_lists": self.get_tag_for_category(cate.id, tag_range=3000, site_range=10000)
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
    def get(self, request):
        raise Exception('error for test')




