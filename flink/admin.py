from django.contrib import admin

# Register your models here.
from flink.models import Flink

class FlinkAdmin(admin.ModelAdmin):
    list_display = ('site_name', 'link', 'score')
    pass

admin.site.register(Flink, FlinkAdmin)