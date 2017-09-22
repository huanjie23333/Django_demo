from django.conf.urls import url, include
from web.views import NewsApiView, ClearNewsCacheView

urlpatterns = [
        url(r'^json/', NewsApiView.as_view(), name='list'),
        url(r'^clear_news_cache/', ClearNewsCacheView.as_view(), name='clear'),
]