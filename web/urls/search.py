from django.conf.urls import url
from web.search import NavSearchView

urlpatterns = [
    url(r'^$', NavSearchView.as_view(), name='nav'),
]