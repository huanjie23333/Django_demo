from rest_framework import viewsets

from advert.models import Advertisement
from advert.serializers import AdvertisementSerializer
from nav.views.api import StandardResultsSetPagination


class AdvertListViewSet(viewsets.ModelViewSet):
    pagination_class = StandardResultsSetPagination
    serializer_class = AdvertisementSerializer
    queryset = Advertisement.objects.all()
