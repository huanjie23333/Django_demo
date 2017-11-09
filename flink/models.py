from django.db import models


# Create your models here.

class Flink(models.Model):
    link = models.URLField(blank=False, null=False)
    site_name = models.CharField(max_length=128, null=False, blank=False)
    score = models.IntegerField(default=0)

    def __str__(self):
        return self.site_name

    class Meta:
        ordering = ['-score']
        verbose_name_plural = "友情链接"
        verbose_name = "友情链接"


