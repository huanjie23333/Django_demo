from django.db import models
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _
from django_extensions.db import fields
from taggit.managers import TaggableManager
from model_utils.fields import StatusField
from model_utils import Choices
from caching.base import CachingManager, CachingMixin


class Nav(CachingMixin, models.Model):
    STATUS = Choices('remove', 'draft', 'published')
    cname = models.CharField(max_length=64, null=True, blank=True)
    ename = models.CharField(max_length=64, null=True, blank=True)
    location = models.CharField(max_length=32, null=True, blank=True)
    web_site = models.URLField(blank=True, null=True)
    score = models.IntegerField(default=0)
    tags = TaggableManager(blank=True)
    status = StatusField(_('status'), choices_name='STATUS', default=STATUS.published)
    category = models.CharField(max_length=64, null=False, blank=False)
    alias = models.CharField(max_length=64, null=True, blank=True)
    highlight = models.BooleanField(default=False)

    objects = CachingManager()

    class Meta:
        ordering = ['-score']

    def __str__(self):
        return self.ename or self.cname

    @property
    def main_name(self):
        return self.cname or self.ename


class Dapps(CachingMixin, models.Model):
    slug = fields.RandomCharField(length=12, unique=True, include_alpha=False)
    name = models.CharField(max_length=128, default='')
    founder = models.CharField(max_length=128, default='')
    license = models.CharField(max_length=255, default='')
    mainnet_contract_address = models.URLField(max_length=255)
    ropsten = models.URLField(max_length=255)
    site = models.URLField(max_length=255)
    github = models.URLField(max_length=255)
    created_at = models.DateTimeField(default=timezone.now, db_index=True)
    updated_at = models.DateTimeField(default=timezone.now, db_index=True)

    def __str__(self):
        return self.name
