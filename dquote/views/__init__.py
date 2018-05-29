from django.shortcuts import render

# Create your views here.
from django.views import generic
from dquote.models import DQoute


class DQuoteListView(generic.ListView):
    context_object_name = 'quotes'
    template_name = 'dquote/list.html'
    paginate_by = 30

    def get_queryset(self):
        return DQoute.objects.all()
