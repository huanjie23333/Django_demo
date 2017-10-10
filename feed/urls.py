from django.conf.urls import url
from feed.views import NewsFeed

urlpatterns = [
    url(r'^news$', NewsFeed(), name='news'),
]
