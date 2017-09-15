"""quark URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from web.views import IndexView, CategoryView

urlpatterns = [
    url(r'^admin/', admin.site.urls),

    url(r'^api/dapps/', include('nav.urls.api', namespace='dapps')),
    url(r'^$', IndexView.as_view(), name='web_index'),
    url(r'^cate/(?P<cate_ename>[a-zA-Z_]+).htm$', CategoryView.as_view(), name='category_page'),
]



from django.conf import settings
from django.conf.urls.static import static
if settings.IS_LOCAL_TESTING:
    urlpatterns = urlpatterns + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

if settings.DEBUG:
    import debug_toolbar
    urlpatterns = [
        url(r'^__debug__/', include(debug_toolbar.urls)),
    ] + urlpatterns
