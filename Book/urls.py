"""Book URL Configuration

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
from django.conf.urls import url
from django.contrib import admin
from . import operate

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^search-post$', operate.search_post),
    url(r'^show$',operate.show),
    url(r'^addBook$', operate.addBook),
    url(r'^deleteBook$', operate.deleteBook),
    url(r'^modifyBook$', operate.modifyBook),
    url(r'^modifyWriter$', operate.modifyWriter),
    url(r'^showWriter$', operate.showWriter),
    url(r'^showWriterBook$', operate.showWriterBook),
]
