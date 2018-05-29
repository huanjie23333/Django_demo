from rest_framework import viewsets

from flink.models import Flink
from flink.serializers import FlinkSerializer
from nav.views.api import StandardResultsSetPagination


class FlinkListViewSet(viewsets.ModelViewSet):
    pagination_class = StandardResultsSetPagination
    serializer_class = FlinkSerializer
    queryset = Flink.objects.all()
