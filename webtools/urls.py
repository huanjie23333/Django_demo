from django.conf.urls import url
from webtools.views import ToolsListView, CoinListView, CoinChartView, FetchWebSiteAPIView

urlpatterns = [
    # url(r'^$', ToolsListView.as_view(), name='list'),
    url(r'^coinmarketcap/$', CoinListView.as_view(), name='coin_list'),
    url(r'^chart/$', CoinChartView.as_view(), name='chart'),
    url(r'^site/?$', FetchWebSiteAPIView.as_view(), name='fetch_web_site'),
]
