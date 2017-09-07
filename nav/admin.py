from django.contrib import admin
from nav.models import Nav

# Register your models here.
from django.contrib.admin import SimpleListFilter

class CategoryFilter(SimpleListFilter):
    title = 'CATEGORY'
    parameter_name = 'category'
    def lookups(self, request, model_admin):
        all = list(Nav.objects.values('category').distinct())
        return set([(c['category'],c['category']) for c in all])

    def queryset(self, request, queryset):
        if self.value():
            return queryset.filter(category=self.value())
        else:
            return queryset

class NavAdmin(admin.ModelAdmin):
    list_filter = (CategoryFilter,'status','highlight')
    list_display = ['main_name','cname', 'ename', 'location', \
                    'status', 'web_site', 'category' ,\
                    'tag_list', 'highlight']
    search_fields = ('cname', 'ename', )
    list_editable = ('status', 'highlight' )

    def get_queryset(self, request):
        return super(NavAdmin, self).get_queryset(request).prefetch_related('tags')

    def tag_list(self, obj):
        return u", ".join(o.name for o in obj.tags.all())


admin.site.register(Nav, NavAdmin)
