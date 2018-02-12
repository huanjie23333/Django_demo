from django.dispatch import receiver
from django.db.models.signals import post_save
from nav.models import SubNav
from nav.serializers import SubNavSerializer
from django.conf import settings
import requests

bot_url = getattr(settings, "BOT_URL")


@receiver(post_save, sender=SubNav)
def notify_bot(sender, instance, created, **kwargs):

    if created and isinstance(instance, SubNav):
        data = SubNavSerializer(instance).data
        post_url = "{base_url}{uri}".format(
            base_url=bot_url,
            uri="website/"
        )
        res = requests.post(post_url, json=data)
        if res.status_code == 200:
            return "OK"
