from django import template

register = template.Library()


def price_class(value):
    try:
       res = '' if float(value) == 0 else ( 'raise' if float(value) > 0 else 'fall')
       return res
    except Exception as e :
       return '无'

register.filter(price_class)


def price_sign(value):
    try:
        res = '' if float(value) == 0 else ('+' if float(value) > 0 else '')
        return res
    except Exception as e:
        return ''
        pass

register.filter(price_sign)