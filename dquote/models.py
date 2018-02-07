from django.utils import timezone

from django.db import models
from django.utils.translation import ugettext_lazy as _


# Create your models here.

class DQoute(models.Model):
    target_date = models.DateField(default=timezone.now, null=False, blank=False)
    person = models.CharField(max_length=64, null=True, blank=True , verbose_name=_("作者"))
    quote = models.CharField(max_length=1024, null=True, blank=True, verbose_name=_("名言"))
    class Meta:
        ordering = ['-target_date']
        verbose_name_plural = _("日签")
        verbose_name = _("日签")



