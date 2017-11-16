from django.conf.urls import url
from web.views.search import NavSearchView, NavFacetedSearchView, NavAutoCompleteView, NewsSearchView

urlpatterns = [
    url(r'^$', NavSearchView.as_view(), name='nav'),
    url(r'^autocomplete/?$', NavAutoCompleteView.as_view(), name='nav_autocomplete'),
    url(r'^faceted/?$', NavFacetedSearchView.as_view(), name='nav_faceted'),
    url(r'^news/$', NewsSearchView.as_view(), name='news'),

]