from django.contrib import admin

from dquote.models import DQoute
# Register your models here.

class DQuoteAdmin(admin.ModelAdmin):
    list_display = ('target_date', 'person', 'quote')
    list_editable =  ('person', 'quote')


admin.site.register(DQoute, DQuoteAdmin)
