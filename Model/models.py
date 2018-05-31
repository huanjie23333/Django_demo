from django.db import models

class Writer(models.Model):
    name = models.CharField(max_length=50)
    sex = models.CharField(max_length=10,default=1)
    age = models.CharField(max_length=5,default=0)
    def __str__(self):
        return self.name


class Article(models.Model):
    name = models.CharField(max_length=20,unique=True)
    writer = models.ForeignKey(Writer,related_name='writers')

