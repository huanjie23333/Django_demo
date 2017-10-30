from django.conf.urls import url
from webtools.views import ToolsListView, CoinHistoryView

urlpatterns = [
    # url(r'^$', ToolsListView.as_view(), name='list'),
    url(r'^coin_history/$', CoinHistoryView.as_view(), name='coinhistory'),

]
