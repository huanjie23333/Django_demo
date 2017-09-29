from django.views import generic

from nav.models import Project


class DAppListView(generic.ListView):
    queryset = Project.objects.all()
    template_name = 'dapp/list.html'
    context_object_name = 'projects'
    pass