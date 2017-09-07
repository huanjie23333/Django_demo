from django.db import models
from django.utils.translation import ugettext_lazy as _
from taggit.managers import TaggableManager
from model_utils.fields import StatusField
from model_utils import Choices

class Nav(models.Model):

    STATUS = Choices('remove', 'draft', 'published')
    cname = models.CharField(max_length=64, null=True,blank=True)
    ename = models.CharField(max_length=64, null=True, blank=True)
    location = models.CharField(max_length=32, null=True, blank=True)
    web_site = models.URLField(blank=True,null=True)
    score = models.IntegerField(default=0)
    tags = TaggableManager()
    status = StatusField(_('status'), choices_name='STATUS', default=STATUS.published)
    category = models.CharField(max_length=64,null=False,blank=False)
    alias = models.CharField(max_length=64, null=True, blank=True)

    class Meta:
        ordering = ['-score']

    def __str__(self):
        return self.ename or self.cname

    @property
    def main_name(self):
        return self.cname or self.ename


# Create your models here.
