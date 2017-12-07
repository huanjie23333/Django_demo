# from django.template import loader, TemplateDoesNotExist, Template, RequestContext
# from django import http
#
# from django.views.defaults import server_error
# from django.views.defaults import page_not_found
#
# from django.views import generic
# from django.template import RequestContext
from django.shortcuts import render_to_response, render


def page_error(request):
    return render(request, 'errors/500.html', status=500)


def webpage_not_found(request):
    return render(request, 'errors/404.html', status=404)
