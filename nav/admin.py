from django.contrib import admin
from nav.models import Nav, Category, Project

# Register your models here.
from django.contrib.admin import SimpleListFilter


class CategoryFilter(SimpleListFilter):
    title = 'CATEGORY'
    parameter_name = 'category'

    def lookups(self, request, model_admin):
        all = list(Category.objects.values('cname').distinct())
        return set([(c['cname'], c['cname']) for c in all])

    def queryset(self, request, queryset):
        if self.value():
            return queryset.filter(cate__cname=self.value())
        else:
            return queryset


class NavAdmin(admin.ModelAdmin):
    list_filter = (CategoryFilter, 'status', 'highlight')
    list_display = ['main_name', 'web_site', \
                    'status', 'cate', \
                    'tag_list', 'highlight', ]
    search_fields = ('cname', 'ename',)
    list_editable = ('status', 'highlight')

    def get_queryset(self, request):
        return super(NavAdmin, self).get_queryset(request)\
                    .prefetch_related('tags')

    def tag_list(self, obj):
        return u", ".join(o.name for o in obj.tags.all())

    def main_name(self, obj):
        return obj.main_name

    main_name.admin_order_field = 'ename'


class CategoryAdmin(admin.ModelAdmin):
    list_display = ('cname', 'ename', 'order')


class DappsAdmin(admin.ModelAdmin):
    list_display = ['name', 'founder', 'site']


admin.site.register(Nav, NavAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Project, DappsAdmin)
