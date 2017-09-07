from .settings import *



SESSION_ENGINE          = 'django.contrib.sessions.backends.cache'

CACHES = {
    'default': {
        'BACKEND': 'diskcache.DjangoCache',
        'LOCATION': '/tmp/quark_cache',
        'SHARDS': 4,
        'DATABASE_TIMEOUT': 1.0,
        'OPTIONS': {
            'size_limit': 2 ** 32  # 4 gigabytes
        },
    },
}

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

Current_Dbhost = '127.0.0.1'
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'bit03',
        'USER': 'root',
        'PASSWORD': 'mypass740323',
        'HOST': Current_Dbhost,
        'PORT': '6301',
        'OPTIONS': {
            'use_unicode':'utf8mb4',
            'init_command':'SET default_storage_engine=INNODB',
        }
    },

}

