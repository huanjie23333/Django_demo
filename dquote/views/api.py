from rest_framework import viewsets

from dquote.models import DQoute
from dquote.serializers import DQouteSerializer
from nav.views.api import StandardResultsSetPagination


class DQouteListViewSet(viewsets.ModelViewSet):
    pagination_class = StandardResultsSetPagination
    serializer_class = DQouteSerializer
    queryset = DQoute.objects.all()
