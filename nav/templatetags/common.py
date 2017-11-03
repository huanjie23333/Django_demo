from django import template

register = template.Library()


def price_class(value):
    try:
       res = '' if float(value) == 0 else ( 'raise' if float(value) > 0 else 'fall')
       return res
    except Exception as e :
       return 'Not Acceptable Value'
       pass

register.filter(price_class)