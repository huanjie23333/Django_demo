import logging
from haystack.generic_views import SearchView, FacetedSearchView
from nav.models import Nav

logger = logging.getLogger("django")


class NavSearchView(SearchView):
    pass


class NavFacetedSearchView(FacetedSearchView):
    facet_fields = ["tags", ]
    template_name = "search/nav/faceted.html"
    model = Nav

    def get_queryset(self):
        qs = super(NavFacetedSearchView, self).get_queryset()
        for field in self.facet_fields:
            qs = qs.facet(field)
        return qs

    def get_context_data(self, **kwargs):
        logger.info(self.queryset.facet_counts())
        context = super(NavFacetedSearchView, self).get_context_data(**kwargs)
        context.update({'facets': self.get_queryset().facet_counts()})
        return context