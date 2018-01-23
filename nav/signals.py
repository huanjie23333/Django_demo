from django.dispatch import receiver
from django.db.models.signals import post_save
from nav.models import SubNav
import requests


@receiver(post_save, sender=SubNav)
def notify_bot(sender, instance, created, **kwargs):

    if created and isinstance(instance, SubNav):
        pass




