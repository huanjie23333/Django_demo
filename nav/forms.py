from django.core.exceptions import ValidationError
from django.forms import ModelForm, Textarea

from captcha import Captcha
from captcha.fields import CaptchaField, CaptchaTextInput

from nav.models import SubNav


class SubNavModelForm(ModelForm):
    captcha_code = CaptchaField(label=u'图片验证码',
                                required=True,
                                widget=CaptchaTextInput(attrs={
                                    'class': u'cap-image',
                                    'placeholder': u'请输入验证码',
                                    'autocapitalize': 'off',
                                    'autocomplete': 'off',
                                    'spellcheck': 'off',
                                }))
    # captcha = CaptchaField(label=_("验证码"))

    class Meta:
        model = SubNav
        exclude = ['handeled']
        widgets = {
            'description':  Textarea(attrs={'rows':6,
                                            'cols':22,
                                            'style': 'resize: none'}
                                     )
        }

    def __init__(self, request=None, *args, **kwargs):
        self.request = request
        super().__init__(*args, **kwargs)

    def clean_captcha_code(self):
        _captchat_code = self.cleaned_data.get('captcha_code')
        ca = Captcha()
        print (_captchat_code)
        checkcode = self.request.session.get(ca.session_key)
        if _captchat_code != checkcode:
            raise ValidationError(u"图片验证码错误")

        del self.request.session[ca.session_key]
        return _captchat_code

