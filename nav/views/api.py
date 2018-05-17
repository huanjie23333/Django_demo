# from rest_framework.generics import ListCreateAPIView, RetrieveUpdateAPIView, ListAPIView
from braces.views import JSONResponseMixin
from django.views.generic import TemplateView
from rest_framework import generics, viewsets
from nav.serializers import NavSerializer, NavDetailSerializer, CategorySerializer
from nav.models import Nav, Category
from rest_framework import pagination


class StandardResultsSetPagination(pagination.PageNumberPagination):
    page_size = 30
    page_size_query_param = 'size'
    max_page_size = 1000


class CommonCateListViewSet(viewsets.ModelViewSet):
    pagination_class = StandardResultsSetPagination
    serializer_class = CategorySerializer
    queryset = Category.objects.all().order_by('-id')


class CommonNavListViewSet(viewsets.ModelViewSet):
    pagination_class = StandardResultsSetPagination
    serializer_class = NavDetailSerializer
    queryset = Nav.objects.all().order_by('-id')

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return NavDetailSerializer
        else:
            return NavSerializer


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
