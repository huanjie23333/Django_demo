from rest_framework.generics import ListCreateAPIView, RetrieveUpdateAPIView, ListAPIView
from nav.serializers import ProjectSerializer, NavSerializer
from nav.models import Project, Nav


class NavListAPIView(ListCreateAPIView):
    serializer_class = NavSerializer
    queryset = Nav.objects.all()
    model = Nav


class NavDetailAPIView(RetrieveUpdateAPIView):
    serializer_class = NavSerializer
    queryset = Nav.objects.all()
    model = Nav


class ProjectListAPIView(ListCreateAPIView):
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()
    model = Project


class ProjectDetailAPIView(RetrieveUpdateAPIView):
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()
    model = Project
    lookup_field = 'identified_code'
