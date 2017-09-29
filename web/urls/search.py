from django.conf.urls import url
from web.views.search import NavSearchView, NavFacetedSearchView

urlpatterns = [
    url(r'^$', NavSearchView.as_view(), name='nav'),
    url(r'^/faceted$', NavFacetedSearchView.as_view(), name='nav_faceted'),
]