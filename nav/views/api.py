# from rest_framework.generics import ListCreateAPIView, RetrieveUpdateAPIView, ListAPIView
from rest_framework import generics
from nav.serializers import NavSerializer, NavDetailSerializer
from nav.models import Nav
from rest_framework import pagination


class StandardResultsSetPagination(pagination.PageNumberPagination):
    page_size = 10
    page_size_query_param = 'size'
    max_page_size = 1000

class NavListAPIView(generics.ListAPIView):
    serializer_class = NavSerializer
    queryset = Nav.objects.all()
    model = Nav


class CommonNavListAPIView(generics.ListCreateAPIView):
    serializer_class = NavDetailSerializer
    queryset = Nav.objects.all().order_by('-id')
    model = Nav
    pagination_class = StandardResultsSetPagination


class NavDetailAPIView(generics.RetrieveUpdateAPIView):
    serializer_class = NavSerializer
    queryset = Nav.objects.all()
    model = Nav
