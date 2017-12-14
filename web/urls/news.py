from django.conf.urls import url, include
from web.views.news import NewsApiView, ClearNewsCacheView, NewsDetailView, NewsTagListView

urlpatterns = [
        url(r'^json/', NewsApiView.as_view(), name='json_list'),
        url(r'^tag/(?P<tag>.*)/$', NewsTagListView.as_view(), name='tag_news'),
        url(r'^clear_news_cache/', ClearNewsCacheView.as_view(), name='clear'),
        url(r'^(?P<slug>\d+).htm$', NewsDetailView.as_view(), name='detail'),
]