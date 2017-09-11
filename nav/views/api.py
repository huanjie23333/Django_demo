from rest_framework.generics import ListAPIView
from nav.serializers import DappsSerializer
from nav.models import Dapps


class DappsListAPIView(ListAPIView):
    serializer_class = DappsSerializer
    queryset = Dapps.objects.all()
    model = Dapps

    