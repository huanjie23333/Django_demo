from django.utils import timezone

from django.db import models
from django.utils.translation import ugettext_lazy as _


# Create your models here.

class DQoute(models.Model):
    target_date = models.DateField(default=timezone.now, null=False, blank=False)
    person = models.CharField(max_length=32, null=True, blank=True , verbose_name=_("作者"))
    person_en = models.CharField(max_length=32, null=True, blank=True , verbose_name=_("作者英文名"))

    quote = models.CharField(max_length=1024, null=True, blank=True, verbose_name=_("名言"))
    quote_en = models.CharField(max_length=1024, null=True, blank=True, verbose_name=_("英文名言"))



    class Meta:
        ordering = ['-target_date']
        verbose_name_plural = _("日签")
        verbose_name = _("日签")



