from rest_framework.generics import ListCreateAPIView, RetrieveAPIView
from nav.serializers import DappsSerializer
from nav.models import Dapps


class DappsListAPIView(ListCreateAPIView):
    serializer_class = DappsSerializer
    queryset = Dapps.objects.all()
    model = Dapps


class DappsDetailAPIView(RetrieveAPIView):
    serializer_class = DappsSerializer
    queryset = Dapps.objects.all()
    model = Dapps
    lookup_field = 'slug'