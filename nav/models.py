# -*- coding: utf-8 -*-
from hashlib import md5

from django.db import models
from django.utils import timezone
from django.utils.functional import cached_property
from django.utils.translation import ugettext_lazy as _
from django_extensions.db import fields
# from django.utils.
from taggit.managers import TaggableManager
from model_utils.fields import StatusField
from model_utils import Choices
from caching.base import CachingManager, CachingMixin
import opencc


class Category(CachingMixin, models.Model):
    cname = models.CharField(max_length=64, null=False, blank=False, db_index=True)
    ename = models.CharField(max_length=64, null=False, blank=False, db_index=True)
    order = models.IntegerField(default=1)

    objects = CachingManager()

    def __str__(self):
        return self.cname

    class Meta:
        ordering = ['-order']
        verbose_name_plural = "分类"
        verbose_name = "分类"




class Nav(CachingMixin, models.Model):
    STATUS = Choices('remove', 'draft', 'published')
    cname = models.CharField(max_length=64, null=True, blank=True)
    ename = models.CharField(max_length=64, null=True, blank=True)
    description = models.TextField(default='', blank=True)
    location = models.CharField(max_length=32, null=True, blank=True)
    web_site = models.URLField(blank=True, null=True)
    score = models.IntegerField(default=0, db_index=True)
    tags = TaggableManager(blank=True)
    status = StatusField(_('status'), choices_name='STATUS', default=STATUS.published)
    # deprecated , will be removed
    # category = models.CharField(max_length=64, null=True, blank=True)
    alias = models.CharField(max_length=64, null=True, blank=True)
    highlight = models.BooleanField(default=False)
    # add foreign key for category
    cate = models.ForeignKey(Category, related_name='navs', default=1)

    created_at = models.DateTimeField(default=timezone.now, editable=False, db_index=True)
    updated_at = models.DateTimeField(auto_now=True, editable=False, db_index=True)

    objects = CachingManager()

    class Meta:
        ordering = ['-score']
        verbose_name_plural = "导航站点"
        verbose_name = "导航站点"

    def __str__(self):
        return self.ename or self.cname

    @cached_property
    def zh_hant_main_name(self):
        return opencc.convert(self.main_name, config='s2t.json')

    @cached_property
    def main_name(self):
        return self.cname or self.ename

    def get_main_description(self):
        try:
            desc = self.profile.description
        except Profile.DoesNotExist as e:
            desc = self.description
        return desc


class Profile(models.Model):
    site = models.OneToOneField(Nav, related_name="profile")
    description = models.TextField(_("中文描述"), null=True, blank=True)

    def __str__(self):
        return self.site.main_name


class Project(CachingMixin, models.Model):
    slug = fields.RandomCharField(length=12, unique=True, include_alpha=False)
    status = fields.CharField(max_length=255, default='')
    name = models.CharField(max_length=128, default='', unique=True)
    description = models.TextField(default='')
    description_cn = models.TextField(default='')
    founder = models.CharField(max_length=128, default='')
    software_license = models.CharField(max_length=255, default='')
    mainnet_contract_address = models.CharField(max_length=255, null=True)
    ropsten = models.URLField(max_length=255, null=True)
    site = models.URLField(max_length=255, null=True)
    github = models.URLField(max_length=255, null=True)
    blog = models.URLField(max_length=255, null=True)
    wiki = models.URLField(max_length=255, null=True)
    slack = models.URLField(max_length=255, null=True)
    gitter = models.URLField(max_length=255, null=True)
    reddit = models.URLField(max_length=255, null=True)

    highlight = models.BooleanField(default=False, db_index=True)
    whitepaper = models.URLField(_("whitepaper"), default="")

    origin_link = models.URLField(max_length=255, null=True)

    created = models.DateField(default=timezone.now, db_index=True)
    last_updated = models.DateField(default=timezone.now, db_index=True)

    identified_code = models.CharField(max_length=128, unique=True,
                                       null=True, blank=True, editable=False)

    tags = TaggableManager()

    objects = CachingManager()

    class Meta:
        ordering = ["-last_updated"]

    def __str__(self):
        return self.name

    def tag_list(self):
        return [o.name for o in self.tags.all()]

    def save(self, **kwargs):
        if self.origin_link and self.origin_link.startswith('http') and self.identified_code is None:
            self.identified_code = md5(self.origin_link.encode('utf-8')).hexdigest()
        return super().save(**kwargs)


class SubNav(models.Model):
    '''
        User submitted Nav site
    '''

    web_site = models.URLField(blank=False, null=False, verbose_name=_('网址'))
    cname = models.CharField(max_length=64, null=False, blank=False, verbose_name=_('中文名称'), unique=True)
    ename = models.CharField(max_length=64, null=True, blank=True, verbose_name=_('英文名称，非必填'))
    description = models.TextField(max_length=256, default='',
                                   blank=True, null=True,
                                   verbose_name=_('网站描述，一句话'))
    email = models.EmailField(blank=True, null=True, verbose_name=_('联系邮箱'))
    handeled = models.BooleanField(default=False)

    class Meta:
        verbose_name_plural = "用户提交网址"
        verbose_name = "用户提交网址"
