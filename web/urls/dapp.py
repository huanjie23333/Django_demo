from django.conf.urls import url, include
from web.views.dapp import DAppListView
urlpatterns = [
        url(r'^$', DAppListView.as_view(), name='detail'),
]