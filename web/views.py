# -*- coding: UTF-8  -*-
from django.views.generic import TemplateView

from nav.models import Nav
from taggit.models import TaggedItem, Tag
from django.db.models import Count


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

        context['coins_tag_navs'] = self.get_tag_for_category('数字货币')
        context['sector_info_tag_navs'] = self.get_tag_for_category('行业资讯')
        context['exchanges_tag_navs'] = self.get_tag_for_category('交易理财')
        context['purse_tag_navs'] = self.get_tag_for_category('钱包支付')
        context['minning_tag_navs'] = self.get_tag_for_category('挖矿算力')
        context['blockchain_tag_navs'] = self.get_tag_for_category('区块链')
        return context


    def get_category_nav(self, category):
        return Nav.objects.filter(category=category)

    def get_recommend_nav(self):
        return Nav.objects.filter(score__gte=85)

    def get_tag_for_category(self, category, tag_range=3, site_range=20):

        nav_ids  = list(self.get_nav_ids_by_category(category))
        tagids = list(TaggedItem.objects.filter(object_id__in=nav_ids)\
                           .values('tag_id', 'tag__name').annotate(tagCount=Count('tag_id'))\
                           .order_by('-tagCount'))
        tag_nav_list = [ {
                         'tagname': obj['tag__name'],
                         'navs':  Nav.objects.filter(tags__id=obj['tag_id'], category=category)[:site_range]
                         }
                         for obj in tagids]
        return tag_nav_list

    def get_nav_ids_by_category(self, category):
        return Nav.objects.filter(category=category).values_list('id', flat=True)








