from django.shortcuts import render

# Create your views here.
from django.views.generic import TemplateView

from web.views.news import SideBarDataMixin

class ToolsListView(SideBarDataMixin, TemplateView):
    template_name = 'webtools/list.html'

    pass