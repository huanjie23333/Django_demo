# from rest_framework.generics import ListCreateAPIView, RetrieveUpdateAPIView, ListAPIView
from braces.views import JSONResponseMixin
from django.views.generic import TemplateView
from rest_framework import generics, viewsets
from nav.serializers import NavSerializer, NavDetailSerializer
from nav.models import Nav
from rest_framework import pagination


class StandardResultsSetPagination(pagination.PageNumberPagination):
    page_size = 30
    page_size_query_param = 'size'
    max_page_size = 1000


# class NavListAPIView(generics.ListAPIView):
#     serializer_class = NavSerializer
#     queryset = Nav.objects.all()
#     model = Nav


# class CommonNavListAPIView(generics.ListCreateAPIView):
#     serializer_class = NavDetailSerializer
#     queryset = Nav.objects.all().order_by('-id')
#     model = Nav
#     pagination_class = StandardResultsSetPagination


class CommonNavListViewSet(viewsets.ModelViewSet):
    pagination_class = StandardResultsSetPagination
    serializer_class = NavDetailSerializer
    queryset = Nav.objects.all().order_by('-id')


class NavDetailAPIView(generics.RetrieveUpdateAPIView):
    serializer_class = NavSerializer
    queryset = Nav.objects.all()
    model = Nav


class NavModelFieldsJsonView(JSONResponseMixin, TemplateView):

    def get(self, request, *args, **kwargs):
        fields = self.get_model_fields(Nav)
        fields = [{'class': f.__class__.__name__,
                   'name': f.name,
                   'help': getattr(f, 'help_text', None),
                   } for f in fields]
        content = {'fields': fields}
        return self.render_json_response(context_dict=content)

    @staticmethod
    def get_model_fields(model):
        return model._meta.get_fields()
