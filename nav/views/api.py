# from rest_framework.generics import ListCreateAPIView, RetrieveUpdateAPIView, ListAPIView
from rest_framework import generics
from nav.serializers import NavSerializer
from nav.models import Nav


class NavListAPIView(generics.ListCreateAPIView):
    serializer_class = NavSerializer
    queryset = Nav.objects.all()
    model = Nav


class NavDetailAPIView(generics.RetrieveUpdateAPIView):
    serializer_class = NavSerializer
    queryset = Nav.objects.all()
    model = Nav
