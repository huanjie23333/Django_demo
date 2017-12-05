from django.contrib import admin

# Register your models here.


# Define a new FlatPageAdmin
from django.contrib.flatpages.admin import FlatPageAdmin
from django.contrib.flatpages.models import FlatPage
from django.db import models
from simplemde.widgets import SimpleMDEEditor


class ReFlatPageAdmin(FlatPageAdmin):
    formfield_overrides = {
        models.TextField: {'widget': SimpleMDEEditor()},
    }


# Re-register FlatPageAdmin
admin.site.unregister(FlatPage)
admin.site.register(FlatPage, ReFlatPageAdmin)
