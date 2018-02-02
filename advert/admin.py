from django.contrib import admin
from advert.models import Advertisement
# Register your models here.

from django.conf import settings

class AdvertAdmin(admin.ModelAdmin):
    def image_tag(self, obj):
        return u'<img src="http://%s/%s"  width="100px" />' % (settings.QINIU_BUCKET_DOMAIN, obj.image)

    image_tag.short_description = 'Image'
    image_tag.allow_tags = True

    list_display = ['title','image_tag', 'link', 'enable', 'position', 'created_at']
    readonly_fields = ('image_tag', )
    list_filter = ('position',)


admin.site.register(Advertisement, AdvertAdmin)
