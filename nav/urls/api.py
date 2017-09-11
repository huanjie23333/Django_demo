from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from nav.views.api import DappsListAPIView, DappsDetailAPIView


urlpatterns = [
    url(r'^$', DappsListAPIView.as_view(), name='list'),
    url(r'^(?P<slug>\d+)/?$', DappsDetailAPIView.as_view(), name='detail'),
]

urlpatterns = format_suffix_patterns(urlpatterns)