from django.conf.urls import url
from web.views.dapp import DAppListView, DAppDetailView
urlpatterns = [
        url(r'^$', DAppListView.as_view(), name='list'),
        url(r'^(?P<slug>\d+)\.htm$', DAppDetailView.as_view(), name='detail'),
]