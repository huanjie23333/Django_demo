from django.db import models

# Create your models here.

class Flink(models.Model):
    link = models.URLField(blank=False, null=False)
    site_name = models.CharField(max_length=128, null=False, blank=False)
    score = models.IntegerField(default=0)