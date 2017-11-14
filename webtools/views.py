import requests
from django.core.cache import cache
from django.views.generic import TemplateView, View
from braces.views import AjaxResponseMixin, JSONResponseMixin
from bs4 import BeautifulSoup


from web.views.news import SideBarDataMixin


class ToolsListView(SideBarDataMixin, TemplateView):
    template_name = 'webtools/list.html'

    pass


class ApiCacheMixin(object):
    def get_api_data(self, url, timeout=5 * 60):
        key = 'api:%s:cache' % url
        res = cache.get_or_set(key, self._get_data(url), timeout=timeout)
        return res

    def _get_data(self, url):
        try:
            res = requests.get(url, timeout=10)
            if res.status_code == 200:
                return res.json()
            else:
                return None
        except Exception as e:
            return None

    def format_url(self, fsym, tsym, limit=200, base_url=None):
        base_url = base_url or self.BASE_URL


class CyptoCompareDataMixin(ApiCacheMixin):
    COIN_LIST_URL = 'https://min-api.cryptocompare.com/data/all/coinlist'
    BASE_URL = 'https://min-api.cryptocompare.com/data/'

    def get_coin_list(self):
        return self.get_api_data(self.COIN_LIST_URL, 24 * 60 * 60)

    def get_coin_hour_hist(self, coin_symbol, to_symbol="CNY"):
        url = '%shistohour?fsym=%s&tsym=%s&limit=60' % (self.BASE_URL, coin_symbol, to_symbol)
        return self.get_api_data(url, timeout=10 * 60 * 60)

    def get_coin_min_hist(self, coin_symbol, to_symbol="CNY"):
        url = '%shistominute?fsym=%s&tsym=%s&limit=60' % (self.BASE_URL, coin_symbol, to_symbol)
        return self.get_api_data(url, timeout=30)

    def get_coin_day_hist(self, coin_symbol, to_symbol="CNY"):
        url = '%shistoday?fsym=%s&tsym=%s&limit=60' % (self.BASE_URL, coin_symbol, to_symbol)
        return self.get_api_data(url, timeout=12 * 60 * 60)


class CoinMarketCapDataMixin(ApiCacheMixin):
    COIN_LIST_URL = 'https://api.coinmarketcap.com/v1/ticker/?convert=CNY&limit=100'

    def get_top_coin_list(self):
        return self.get_api_data(self.COIN_LIST_URL, timeout=60)


class CoinListView(CoinMarketCapDataMixin, TemplateView):
    template_name = 'webtools/coin_list.html'

    def get_context_data(self, **kwargs):
        context = super(CoinListView, self).get_context_data(**kwargs)
        c_list = self.get_top_coin_list()[:100]
        context.update({
            'coins': c_list,
            'seo': {
                'title': '区块链导航 ：加密货币报价列表',
                'key_words': ','.join([coin['name'] for coin in c_list]),
                'description': "区块链导航 ChainDH ：汇集重要加密货币市值和报价。"
            }
        })
        return context


class CoinChartView(CoinMarketCapDataMixin, TemplateView):
    template_name = 'webtools/coin_chart.html'


class FetchWebSiteAPIView(JSONResponseMixin, AjaxResponseMixin, View):
    http_method_names = ['get_ajax', 'get']

    @property
    def url(self):
        _url = self._url
        if not  self._url.startswith("http"):
            _url = "http://{url}".format(url=self._url)
        return _url

    def get_site(self):
        data = dict()
        r = requests.get(self.url)
        soup = BeautifulSoup(r.content, 'lxml')

        try:
            desc = soup.find(attrs={"name": "description"}).get("content")
        except AttributeError as e:
            desc = ""
        data.update({
            "title": soup.title.string,
            "description": desc,
        })
        return data

    def get(self, request, *args, **kwargs):
        return self.get_ajax(request, *args, **kwargs)

    def get_ajax(self, request, *args, **kwargs):
        self._url = request.GET.get('url', None)
        assert self._url is not None
        data = self.get_site()
        return self.render_json_response(context_dict=data)

