from django.conf.urls import url, include
from rest_framework.schemas import get_schema_view
from rest_framework.urlpatterns import format_suffix_patterns

from nav.views.api import CommonNavListAPIView

schema_view = get_schema_view(title='ChainNews API')

# web api
urlpatterns = [
    url(r'^nav_list/?$', CommonNavListAPIView.as_view(), name='navs'),
    # api docs
    url(r'^schema/$', schema_view),
]


urlpatterns = format_suffix_patterns(urlpatterns)
