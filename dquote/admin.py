from django.contrib import admin
from dquote.models import DQoute
# Register your models here.
# import unicodecsv
import csv
from django.http import HttpResponse
import time


def export_as_csv_action(description="Export selected objects as CSV file",
                         fields=None, exclude=None, header=True):
    """
    This function returns an export csv action
    'fields' and 'exclude' work like in django ModelForm
    'header' is whether or not to output the column names as the first row
    """

    def export_as_csv(modeladmin, request, queryset):
        opts = modeladmin.model._meta

        if not fields:
            field_names = [field.name for field in opts.fields]
        else:
            field_names = fields

        response = HttpResponse(content_type='text/csv')
        s = str(int(time.time())) + '_' + str(opts).replace('.', '_')
        response['Content-Disposition'] = 'attachment; filename=%s.csv' % s

        writer = csv.writer(response)
        if header:
            writer.writerow(field_names)
        for obj in queryset:
            row = [getattr(obj, field)() if callable(getattr(obj, field)) else getattr(obj, field) for field in
                   field_names]
            writer.writerow(row)
        return response

    export_as_csv.short_description = description
    return export_as_csv


class DQuoteAdmin(admin.ModelAdmin):
    list_display = ('target_date', 'person', 'person_en', 'quote', 'quote_en')
    list_editable = ('person', 'person_en', 'quote', 'quote_en')
    ist_per_page = 30

    actions = [export_as_csv_action(
        "CSV Export",
        fields=['target_date', 'person', 'person_en', 'quote', 'quote_en'])]

    def get_form(self, request, obj=None, **kwargs):
        form = super().get_form(request, obj, **kwargs)
        form.base_fields['person'].widget.attrs['style'] = 'width: 12em;'
        form.base_fields['person_en'].widget.attrs['style'] = 'width: 12em;'
        return form


admin.site.register(DQoute, DQuoteAdmin)
