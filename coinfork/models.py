from django.db import models
from django.utils.translation import gettext as _

# Create your models here.
from model_utils import Choices
from model_utils.fields import StatusField


class CoinFork(models.Model):
    STATUS = Choices('removed', 'done', 'incoming')

    coin_name = models.CharField(max_length=64, null=False, blank=False)
    coin_ename = models.CharField(max_length=64,null=True, blank=True)
    fork_name = models.CharField(max_length=64, null=False, blank=False, unique=True)
    fork_ename = models.CharField(max_length=64, null=True, blank=True)
    fork_alias = models.CharField(max_length=32, null=True, blank=True, unique=False)

    status = StatusField(_('status'), choices_name='STATUS', default=STATUS.incoming)

    block_mining_time = models.FloatField(help_text=_("平均出块时间, mint"), default=10)
    fork_height = models.IntegerField(help_text=_("分叉高度"))
    current_height_api = models.URLField(help_text=_("当前区块高度API"), default='https://blockchain.info/q/getblockcount')
    description = models.TextField(default='', blank=True)
    official_site = models.URLField(blank=True, null=True)
    related_article = models.URLField(blank=True, null=True)

    class Meta:
        ordering = ['-status','fork_height',]
        verbose_name_plural = "加密货币分叉"
        verbose_name = "加密货币分叉"













