from django.contrib import admin
from nav.models import Nav, Category

# Register your models here.
from django.contrib.admin import SimpleListFilter

class CategoryFilter(SimpleListFilter):
    title = 'CATEGORY'
    parameter_name = 'category'
    def lookups(self, request, model_admin):
        all = list(Category.objects.values('cname').distinct())
        return set([(c['cname'],c['cname']) for c in all])

    def queryset(self, request, queryset):
        if self.value():
            return queryset.filter(cate__cname=self.value())
        else:
            return queryset

class NavAdmin(admin.ModelAdmin):

    list_filter = (CategoryFilter,'status','highlight')
    list_display = ['main_name','cname','location','web_site', 'ename', \
                    'status', 'cate', \
                    'tag_list', 'highlight',]
    search_fields = ('cname', 'ename', )
    list_editable = ('status', 'highlight' ,'cate')


    def get_queryset(self, request):
        return super(NavAdmin, self).get_queryset(request).prefetch_related('tags')

    def tag_list(self, obj):
        return u", ".join(o.name for o in obj.tags.all())


    def main_name(self, obj):
        return obj.main_name

    main_name.admin_order_field = 'ename'

admin.site.register(Nav, NavAdmin)


class CategoryAdmin(admin.ModelAdmin):
    list_display = ('cname', 'ename')
admin.site.register(Category, CategoryAdmin)