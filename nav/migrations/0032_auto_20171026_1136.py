# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-10-26 03:36
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('nav', '0031_auto_20171025_1607'),
    ]

    operations = [
        migrations.AlterField(
            model_name='subnav',
            name='email',
            field=models.EmailField(blank=True, max_length=254, null=True, verbose_name='联系邮箱'),
        ),
        migrations.AlterField(
            model_name='subnav',
            name='ename',
            field=models.CharField(blank=True, max_length=64, null=True, verbose_name='英文名称，非必填'),
        ),
        migrations.AlterField(
            model_name='subnav',
            name='web_site',
            field=models.URLField(verbose_name='网址'),
        ),
    ]
