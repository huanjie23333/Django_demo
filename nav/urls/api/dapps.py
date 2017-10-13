from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from nav.views.api import ProjectListAPIView, ProjectDetailAPIView


urlpatterns = [
    url(r'^$', ProjectListAPIView.as_view(), name='list'),
    url(r'^(?P<identified_code>\w+)/?$', ProjectDetailAPIView.as_view(), name='detail'),
]

urlpatterns = format_suffix_patterns(urlpatterns)