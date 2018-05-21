from django.conf.urls import url, include
# from rest_framework.schemas import get_schema_view
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework_swagger.views import get_swagger_view

from nav.views.api import (CommonNavListViewSet, NavModelFieldsJsonView,
                           CommonCateListViewSet, CommonSubNavListViewSet)

# schema_view = get_schema_view(title='Block123 API')

from rest_framework import routers

router = routers.SimpleRouter()
router.register(r'nav', CommonNavListViewSet)
router.register(r'cate', CommonCateListViewSet)
router.register(r'subnav', CommonSubNavListViewSet)

# web api
urlpatterns = [
    url(r'^docs/?$', get_swagger_view(title='Quark API Docs')),
]
urlpatterns += router.urls

urlpatterns = format_suffix_patterns(urlpatterns)
