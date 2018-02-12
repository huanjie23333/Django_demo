from django.apps import AppConfig
from django.db.models.signals import post_save


class NavConfig(AppConfig):
    name = 'nav'

    def ready(self):
        from nav.models import SubNav
        from nav.signals import notify_bot
        post_save.connect(notify_bot, sender=SubNav)
