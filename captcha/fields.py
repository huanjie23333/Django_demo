# coding=utf-8
from django import forms
from django.core.urlresolvers import reverse
from django.forms.utils import flatatt
from django.utils.html import format_html


class CaptchaTextInput(forms.Widget):
    def __init__(self, attrs=None):
        super(CaptchaTextInput, self).__init__(attrs)

    def image_url(self):
        return reverse('captcha')

    # def render(self, **kwargs):
    def render(self, name, value, attrs=None):
        final_attrs = self.build_attrs(attrs)
        # final_attrs = self.build_attrs(**kwargs)
        _input =  format_html(u'<input{} />', flatatt(final_attrs))
        _code_img = format_html(u'<img class="c-image image_VhirG6" src={image_url}>'.format(image_url=self.image_url()))
        return _input + _code_img


class CaptchaField(forms.Field):
    widget = CaptchaTextInput

    def __init__(self, *args, **kwargs):
        super(CaptchaField, self).__init__(*args, **kwargs)
