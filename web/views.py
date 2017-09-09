# -*- coding: UTF-8  -*-
from django.views.generic import TemplateView

from nav.models import Nav


class IndexView(TemplateView):
    template_name = 'web/index.html'

    def get_context_data(self, **kwargs):
        context = super(IndexView, self).get_context_data(**kwargs)
        context['recommend'] = self.get_recommend_nav()
        context['coins'] = self.get_coins()
        context['sectorinfo'] = self.get_sectorinfo()
        context['exchanges'] = self.get_exhcanges()
        context['purse'] = self.get_purse()
        context['minning']  = self.get_minning()
        context['blockchain']  = self.get_blockchain()
        return context

    def get_recommend_nav(self):
        return Nav.objects.filter(score__gte=70)

    def get_coins(self):
        return Nav.objects.filter(category='数字货币')

    def get_sectorinfo(self):
        return Nav.objects.filter(category='行业资讯')

    def get_exhcanges(self):
        return Nav.objects.filter(category='交易平台')

    def get_purse(self):
        return Nav.objects.filter(category='钱包支付')

    def get_minning(self):
        return Nav.objects.filter(category='挖矿算力')

    def get_blockchain(self):
        return Nav.objects.filter(category='区块链')








