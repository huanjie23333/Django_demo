from django.dispatch import receiver
from django.db.models.signals import post_save
from nav.models import SubNav
from nav.serializers import SubNavSerializer
import requests


@receiver(post_save, sender=SubNav)
def notify_bot(sender, instance, created, **kwargs):

    if created and isinstance(instance, SubNav):
        data = SubNavSerializer(instance).data
        res = requests.post("https://9s.coinbeef.com/website/", json=data)
        if res.status_code == 200:
            return "OK"






