from .settings import *


SECRET_KEY = '@qai(b0#l9nfe%1e9upy1ur5*8$&^-=gd%!5=km$(ui0e0$h^r'

IS_LOCAL_TESTING = True
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': ['/mad_sand/quark/templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

ALLOWED_HOSTS = ['127.0.0.1',]
STATIC_URL = '/static/'
STATIC_ROOT = '/mad_sand/quark/static/'
STATICFILES_DIRS = []
