from django.contrib import admin
from dquote.models import DQoute
# Register your models here.


class DQuoteAdmin(admin.ModelAdmin):
    list_display = ('target_date', 'person', 'person_en', 'quote' , 'quote_en')
    list_editable =  ('person', 'person_en', 'quote' , 'quote_en')
    ist_per_page = 30

    def get_form(self, request, obj=None, **kwargs):
        form = super().get_form(request, obj, **kwargs)
        form.base_fields['person'].widget.attrs['style'] = 'width: 12em;'
        form.base_fields['person_en'].widget.attrs['style'] = 'width: 12em;'
        return form



admin.site.register(DQoute, DQuoteAdmin)
