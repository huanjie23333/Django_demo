from django.conf.urls import url, include
from web.views import NewsApiView, ClearNewsCacheView, NewsDetailView, NewsTagListView

urlpatterns = [
        url(r'^json/', NewsApiView.as_view(), name='list'),
        url(r'^tag/(?P<tag>.*)/$', NewsTagListView.as_view(), name='list'),
        url(r'^clear_news_cache/', ClearNewsCacheView.as_view(), name='clear'),
        url(r'^(?P<slug>\d+)/?$', NewsDetailView.as_view(), name='detail'),

]