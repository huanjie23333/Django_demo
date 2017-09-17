from django.db import models
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _
from django_extensions.db import fields
from taggit.managers import TaggableManager
from model_utils.fields import StatusField
from model_utils import Choices
from caching.base import CachingManager, CachingMixin

class Category(CachingMixin, models.Model):
    cname = models.CharField(max_length=64, null=False, blank=False, db_index=True)
    ename = models.CharField(max_length=64, null=False, blank=False, db_index=True)
    order = models.IntegerField(default=1)

    objects = CachingManager()
    def __str__(self):
        return self.cname

    class Meta:
        ordering = ['-order']


class Nav(CachingMixin, models.Model):
    STATUS = Choices('remove', 'draft', 'published')
    cname = models.CharField(max_length=64, null=True, blank=True)
    ename = models.CharField(max_length=64, null=True, blank=True)
    location = models.CharField(max_length=32, null=True, blank=True)
    web_site = models.URLField(blank=True, null=True)
    score = models.IntegerField(default=0)
    tags = TaggableManager(blank=True)
    status = StatusField(_('status'), choices_name='STATUS', default=STATUS.published)
    # deprecated , will be removed
    # category = models.CharField(max_length=64, null=True, blank=True)
    alias = models.CharField(max_length=64, null=True, blank=True)
    highlight = models.BooleanField(default=False)
    #add foreign key for category
    cate = models.ForeignKey(Category, related_name='navs', default=1)

    objects = CachingManager()

    class Meta:
        ordering = ['-score']

    def __str__(self):
        return self.ename or self.cname

    @property
    def main_name(self):
        return self.cname or self.ename


class Project(CachingMixin, models.Model):
    slug = fields.RandomCharField(length=12, unique=True, include_alpha=False)
    name = models.CharField(max_length=128, default='')
    founder = models.CharField(max_length=128, default='')
    license = models.CharField(max_length=255, default='')
    mainnet_contract_address = models.URLField(max_length=255)
    ropsten = models.URLField(max_length=255, null=True)
    site = models.URLField(max_length=255, null=True)
    github = models.URLField(max_length=255, null=True)
    blog = models.URLField(max_length=255, null=True)
    wiki = models.URLField(max_length=255, null=True)
    slack = models.URLField(max_length=255, null=True)
    gitter = models.URLField(max_length=255, null=True)
    reddit = models.URLField(max_length=255, null=True)

    created_at = models.DateTimeField(default=timezone.now, db_index=True)
    updated_at = models.DateTimeField(default=timezone.now, db_index=True)

    tags = TaggableManager()

    objects = CachingManager()

    def __str__(self):
        return self.name
