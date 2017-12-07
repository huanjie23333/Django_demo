import opencc
from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.utils.functional import cached_property

# Create your models here.

class Flink(models.Model):
    link = models.URLField(blank=False, null=False)
    site_name = models.CharField(max_length=128, null=False, blank=False)
    score = models.IntegerField(default=0)

    def __str__(self):
        return self.site_name

    class Meta:
        ordering = ['-score']
        verbose_name_plural = _("友情链接")
        verbose_name = _("友情链接")

    @cached_property
    def zh_hant_site_name(self):
        return opencc.convert(self.site_name, config='s2t.json')
