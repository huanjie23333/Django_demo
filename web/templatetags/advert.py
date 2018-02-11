from django import template

from advert.models import Advertisement

register = template.Library()

@register.inclusion_tag('web/snippets/advert_sidebar.html')
def advert_sidebar_top():
    return {
        'adverts': Advertisement.objects.adverts_right_top()
    }
