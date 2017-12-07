import opencc
import logging
from django import template


register = template.Library()

logger = logging.getLogger("django")


def cc(value):
    text = opencc.convert(value, config='s2t.json')
    return text

register.filter(cc)


