# -*- coding: UTF-8  -*-
from django.views.generic import TemplateView
from django.shortcuts import get_object_or_404
from nav.models import Nav, Category
from taggit.models import TaggedItem, Tag
from django.db.models import Count

INDEX_CATEGORY_IDS_LIST=[1,2,7,3,4,5,6]

class CategoryView(TemplateView):
    template_name = 'web/category.html'
    def get_context_data(self, **kwargs):
        context = super(CategoryView, self).get_context_data(**kwargs)
        cate = context['category'] = self.get_object()
        context['tag_lists'] = self.get_tag_for_category(cate.id, )
        return context

    def get_object(self):
        ename = self.kwargs.get('cate_ename')
        return get_object_or_404(Category, ename=ename)


    def get_tag_for_category(self, category_id, tag_range=3000, site_range=10000):

        nav_ids  = list(self.get_nav_ids_by_category(category_id))
        tagids = list(TaggedItem.objects.filter(object_id__in=nav_ids)\
                           .values('tag_id', 'tag__name').annotate(tagCount=Count('tag_id'))\
                           .order_by('-tagCount'))[:tag_range]
        tag_nav_list = [ {
                         'tagname': obj['tag__name'],
                         'navs':  Nav.objects.filter(tags__id=obj['tag_id'], cate=category_id)[:site_range]
                         }
                         for obj in tagids]
        return tag_nav_list

    def get_nav_ids_by_category(self, category_id):
        return Nav.objects.filter(cate_id=category_id).values_list('id', flat=True)



class IndexView(TemplateView):
    template_name = 'web/index.html'

    def get_context_data(self, **kwargs):
        context = super(IndexView, self).get_context_data(**kwargs)
        context['recommend'] = self.get_recommend_nav()
        # context['coins'] = self.get_category_nav('数字货币')
        # context['sectorinfo'] = self.get_category_nav('行业资讯')
        # context['exchanges'] = self.get_category_nav('交易平台')
        # context['purse'] = self.get_category_nav('钱包支付')
        # context['minning']  = self.get_category_nav('挖矿算力')
        # context['blockchain']  = self.get_category_nav('区块链')


        # context['coins_tag_navs'] = self.get_tag_for_category(category_id=1)
        # context['sector_info_tag_navs'] = self.get_tag_for_category(category_id=2)
        # context['exchanges_tag_navs'] = self.get_tag_for_category(category_id=3)
        # context['purse_tag_navs'] = self.get_tag_for_category(category_id=4)
        # context['minning_tag_navs'] = self.get_tag_for_category(category_id=5)
        # context['blockchain_tag_navs'] = self.get_tag_for_category(category_id=6)

        categories = list(Category.objects.filter(id__in=INDEX_CATEGORY_IDS_LIST))
        cates = dict([(obj.id, obj) for obj in categories])
        sorted_cates = [cates[id] for id in INDEX_CATEGORY_IDS_LIST]
        #sorted

        context['categories'] = [ {
            'category_name': cate.cname,
            'category_ename': cate.ename,
            'cate_tags': self.get_tag_for_category(cate.id)
        }
            for cate in sorted_cates
        ]
        return context


    def get_category_nav(self, category):
        return Nav.objects.filter(category=category)

    def get_recommend_nav(self):
        return Nav.objects.filter(score__gte=85)

    def get_tag_for_category(self, category_id, tag_range=3, site_range=20):

        nav_ids  = list(self.get_nav_ids_by_category(category_id))
        tagids = list(TaggedItem.objects.filter(object_id__in=nav_ids)\
                           .values('tag_id', 'tag__name').annotate(tagCount=Count('tag_id'))\
                           .order_by('-tagCount'))
        tag_nav_list = [ {
                         'tagname': obj['tag__name'],
                         'navs':  Nav.objects.filter(tags__id=obj['tag_id'], cate=category_id)[:site_range]
                         }
                         for obj in tagids]
        return tag_nav_list


    def get_nav_ids_by_category(self, category_id):
        return Nav.objects.filter(cate_id=category_id).values_list('id', flat=True)








