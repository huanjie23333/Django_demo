from braces.views import AjaxResponseMixin
from django.views import View

from captcha import Captcha


class CaptchaCodeView(AjaxResponseMixin, View):
    http_method_names = ['get', 'get_ajax', ]

    def get(self, request, *args, **kwargs):
        ca = Captcha()
        # clean sesson
        _result = ca.display()
        request.session[ca.session_key] = ca._get_answer()
        # request.session.set_expiry(180)
        # request.session.modified = True
        return _result
