from django.contrib import admin
from flink.models import Flink


class FlinkAdmin(admin.ModelAdmin):
    list_display = ('site_name', 'link', 'score')
    search_fields = ('site_name',)
    list_editable = ('score',)


admin.site.register(Flink, FlinkAdmin)
