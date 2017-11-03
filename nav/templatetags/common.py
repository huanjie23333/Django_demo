from django import template

register = template.Library()


def price_class(value):
    return '' if int(value) == 0 else ( 'raise' if int(value) > 0 else 'fall')

register.filter(price_class)