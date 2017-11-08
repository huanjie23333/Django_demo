from django.conf.urls import url
from captcha.views import CaptchaCodeView


urlpatterns = [
    url(r'^$', CaptchaCodeView.as_view(), name='captcha'),
]