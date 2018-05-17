from django.conf.urls import url, include
from rest_framework.schemas import get_schema_view
from rest_framework.urlpatterns import format_suffix_patterns

from nav.views.api import CommonNavListViewSet, NavModelFieldsJsonView, CommonCateListViewSet, CommonSubNavListViewSet

schema_view = get_schema_view(title='ChainNews API')

from rest_framework import routers

router = routers.SimpleRouter()
router.register(r'nav', CommonNavListViewSet)
router.register(r'cate', CommonCateListViewSet)
router.register(r'subnav', CommonSubNavListViewSet)

# web api
urlpatterns = [
    # url(r'^nav/meta_fields/?$', NavModelFieldsJsonView.as_view(), name='fields'),
    # url(r'^', include(router.urls, 'nav')),
    # api docs
    url(r'^schema/$', schema_view),
]
urlpatterns += router.urls

urlpatterns = format_suffix_patterns(urlpatterns)
