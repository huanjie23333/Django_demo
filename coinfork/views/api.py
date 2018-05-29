from rest_framework import viewsets

from coinfork.models import CoinFork
from coinfork.serializers import CoinForkSerializer
from nav.views.api import StandardResultsSetPagination


class CoinForkListViewSet(viewsets.ModelViewSet):
    pagination_class = StandardResultsSetPagination
    serializer_class = CoinForkSerializer
    queryset = CoinFork.objects.all()
