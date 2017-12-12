from django.db import models
from django.utils.translation import gettext as _

# Create your models here.

class CoinFork(models.Model):
    coin_name = models.CharField(max_length=128, null=False, blank=False)
    coin_ename = models.CharField(max_length=128,null=True, blank=True)
    fork_name = models.CharField(max_length=128, null=False, blank=False)
    fork_ename = models.CharField(max_length=128, null=True, blank=True)
    block_mining_time = models.IntegerField(help_text=_("平均出块时间, mint"))
    fork_height = models.IntegerField(help_text=_("分叉高度"))
    current_height_api = models.URLField(help_text=_("当前区块高度API"), default='https://blockchain.info/q/getblockcount')
    description = models.TextField(default='', blank=True)







