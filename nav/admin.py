from django.contrib import admin
from nav.models import Nav

# Register your models here.

class NavAdmin(admin.ModelAdmin):
    list_display = ['cname', 'ename', 'location', 'status', 'web_site']



admin.site.register(Nav, NavAdmin)
