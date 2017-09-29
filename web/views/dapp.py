from django.views import generic

class DAppListView(generic.ListView):
    template_name = 'dapp/list.html'
    pass