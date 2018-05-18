import logging

import opencc
from django.views import generic
from django.http import JsonResponse
from django.views.generic import TemplateView, ListView
from haystack.forms import ModelSearchForm
from haystack.generic_views import SearchView, FacetedSearchView
from haystack.inputs import AutoQuery
from haystack.query import SearchQuerySet
from nav.models import Nav
from web.views.news import SideBarDataMixin

logger = logging.getLogger("django")


class NavModelSearchForm(ModelSearchForm):

    def search(self):
        if not self.is_valid():
            return self.no_query_found()

        if not self.cleaned_data.get('q'):
            return self.no_query_found()

        q = self.cleaned_data['q']
        sqs = self.searchqueryset.auto_query(q)

        if self.load_all:
            sqs = sqs.load_all()

        return sqs


class NavSearchView(SideBarDataMixin, SearchView):
    template_name = 'search/search.html'
    context_object_name = 'nav_list'
    form_class = NavModelSearchForm

    def get_context_data(self, *args, **kwargs):
        context = super().get_context_data(*args, **kwargs)
        return context


class NavAutoCompleteView(generic.View):
    http_method_names = ['get']

    def get(self, request, *args, **kwargs):
        if request.GET.get("q", "") == "":
            return JsonResponse({'results': {}})

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


class NewsSearchView(SideBarDataMixin, TemplateView):
    template_name = 'search/news.html'
