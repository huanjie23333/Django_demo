from django.db import models
from taggit.managers import TaggableManager

class Nav(models.Model):
    name = models.CharField(max_length=64, null=False,blank=False)
    other_name = models.CharField(max_length=64, null=True, blank=True)
    location = models.CharField(max_length=32, null=True, blank=True)
    web_site = models.URLField()
    score = models.IntegerField(default=0,)
    tags = TaggableManager()


    class Meta:
        ordering = ['-score']



    pass

# Create your models here.
