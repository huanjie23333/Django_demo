from django.conf import settings
from django.db import models
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _

# Create your models here.
from utils.image.handlers import UUIDFilename

upload_dir = UUIDFilename('ad/images/')

class Advertisement_Manager(models.Manager):
    def active(self):
        the_now = timezone.now()
        return self.get_queryset().filter(enable=True, start_at__lt=the_now, end_at__gt=the_now)

    def adverts_left_top(self):
        return self.active().filter(position=Advertisement.Left_Top)

    def adverts_left_middle(self):
        return self.active().filter(position=Advertisement.Left_Middle)

    def adverts_left_bottom(self):
        return self.active().filter(position=Advertisement.Left_Bottom)

    def adverts_right_top(self):
        return self.active().filter(position=Advertisement.Right_Top)

    def adverts_right_middle(self):
        return self.active().filter(position=Advertisement.Right_Middle)

    def adverts_right_bottom(self):
        return self.active().filter(position=Advertisement.Right_Bottom)


class Advertisement(models.Model):
    Left_Top, Left_Middle, Left_Bottom, Right_Top,Right_Middle,Right_Bottom = range(6)

    POSITION_CHOICES = (
        (Left_Top, _("顶部主广告")),
        (Left_Middle, _("页中长广告")),
        (Left_Bottom, _("页中第二长广告")),
        (Right_Top, _("侧边顶")),
        (Right_Middle, _("侧边栏中")),
        (Right_Bottom, _("侧边栏下")),
    )

    title = models.CharField(max_length=255,)
    image = models.ImageField(upload_to=upload_dir, default='')
    link = models.URLField(max_length=255,)
    position = models.PositiveSmallIntegerField(default=Left_Top, choices=POSITION_CHOICES)
    created_at = models.DateTimeField(default=timezone.now, db_index=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True, db_index=True, editable=False)

    # control the advert status and display time
    start_at = models.DateTimeField(default=timezone.now, db_index=True, editable=True)
    end_at = models.DateTimeField(default=timezone.now, db_index=True, editable=True)
    enable = models.BooleanField(default=False, )

    objects = Advertisement_Manager()

    # @property
    # def ad_img_url(self):
    #     return  "http://%s/%s" %(settings.QINIU_BUCKET_DOMAIN,self.image)

    class Meta:
        verbose_name = _("advertisement")
        verbose_name_plural = _("advertisement")

    def __str__(self):
        return self.title

