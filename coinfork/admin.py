from django.contrib import admin
from coinfork.models import CoinFork

class CoinForkAdmin(admin.ModelAdmin):
    list_filter = ('coin_name',)
    list_display = ('fork_name', 'fork_ename','fork_height', 'description', 'official_site')


admin.site.register(CoinFork, CoinForkAdmin)