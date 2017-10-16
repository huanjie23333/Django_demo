from django.contrib import admin

# Register your models here.
from flink.models import Flink

class FlinkAdmin(admin.ModelAdmin):
    pass

admin.site.register(Flink, FlinkAdmin)