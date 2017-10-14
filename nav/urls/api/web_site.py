from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from nav.views.api import NavListAPIView, NavDetailAPIView


urlpatterns = [
    url(r'^$', NavListAPIView.as_view(), name='list'),
    url(r'^(?P<pk>\d+)/?$', NavDetailAPIView.as_view(), name='detail'),
]

urlpatterns = format_suffix_patterns(urlpatterns)