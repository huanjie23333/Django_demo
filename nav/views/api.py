from rest_framework.generics import ListCreateAPIView, RetrieveAPIView
from nav.serializers import ProjectSerializer
from nav.models import Project


class ProjectListAPIView(ListCreateAPIView):
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()
    model = Project


class ProjectDetailAPIView(RetrieveAPIView):
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()
    model = Project
    lookup_field = 'slug'