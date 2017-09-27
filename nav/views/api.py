from rest_framework.generics import ListCreateAPIView, RetrieveUpdateAPIView
from nav.serializers import ProjectSerializer
from nav.models import Project


class ProjectListAPIView(ListCreateAPIView):
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()
    model = Project


class ProjectDetailAPIView(RetrieveUpdateAPIView):
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()
    model = Project
    lookup_field = 'name'
