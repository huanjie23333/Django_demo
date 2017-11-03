from django.conf.urls import url
from webtools.views import ToolsListView, CoinListView, CoinChartView

urlpatterns = [
    # url(r'^$', ToolsListView.as_view(), name='list'),
    url(r'^coin_list/$', CoinListView.as_view(), name='coin_list'),
    url(r'^chart/$', CoinChartView.as_view(), name='chart'),

]
