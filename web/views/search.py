import logging
from django.views import generic
from django.http import JsonResponse
from haystack.generic_views import SearchView, FacetedSearchView
from haystack.query import  SearchQuerySet
from nav.models import Nav

logger = logging.getLogger("django")


class NavSearchView(SearchView):
    pass


class NavAutoCompleteView(generic.View):
    http_method_names = ['get']

    def get(self, request, *args, **kwargs):
        sqs = SearchQuerySet().autocomplete(main_name_auto=request.GET.get("q", ""))[:10]
        suggestions = [result.main_name for result in sqs]
        res = {
            'results': suggestions
        }
        return JsonResponse(data=res)


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
        context = super(NavFacetedSearchView, self).get_context_data(**kwargs)
        context.update({'facets': self.get_queryset().facet_counts()})
        return context