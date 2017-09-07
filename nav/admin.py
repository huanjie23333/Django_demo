from django.contrib import admin
from nav.models import Nav


# Register your models here.

class NavAdmin(admin.ModelAdmin):
    list_display = ('main_name', 'cname', 'ename',
                    'location', 'status', 'web_site', )
    list_filter = ('status', )
    search_fields = ('cname', 'ename', )
    list_editable = ('status', )


admin.site.register(Nav, NavAdmin)
