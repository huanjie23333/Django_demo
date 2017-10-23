from django.conf.urls import url
from webtools.views import ToolsListView

urlpatterns = [
    url(r'^$', ToolsListView.as_view(), name='list'),
]
