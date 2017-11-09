from django.forms import ModelForm, Textarea

from captcha.fields import CaptchaField, CaptchaTextInput

from nav.models import SubNav


class SubNavModelForm(ModelForm):
    captcha_code = CaptchaField(label=u'图片验证码',
                                required=True,
                                # min_length=1,
                                widget=CaptchaTextInput(attrs={
                                    'class': u'c-input input_OYyxAV cap-image',
                                    'placeholder': u'请输入验证码',
                                    'autocapitalize': 'off',
                                    'autocomplete': 'off',
                                    'spellcheck': 'off',
                                }))
    # captcha = CaptchaField(label=_("验证码"))

    class Meta:
        model = SubNav
        exclude = ['handeled']
        widgets = {'description': Textarea(attrs={'rows':6, 'cols':22, 'style':'resize: none'})}