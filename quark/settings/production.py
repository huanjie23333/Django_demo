from .settings import *

DEBUG = False

ALLOWED_HOSTS = ["www.bit03.com", "bit03.com"]

'''session
'''
SESSION_ENGINE          = 'django.contrib.sessions.backends.cache'
SESSION_COOKIE_DOMAIN   = ".bit03.com"

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

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'quark',
        'USER': 'quark',
        'PASSWORD': 'quark1@#',
        'HOST': '10.132.11.59',
        'PORT': 3306,
        'OPTIONS': {
            'charset': 'utf8mb4',
            'init_command': "SET storage_engine=INNODB, sql_mode='STRICT_TRANS_TABLES'",
        }
    }
}

STATIC_URL = '//static.bit03.com/static/'
STATIC_ROOT = '/data/www/static/'

COMPRESS_ENABLED = True

COMPRESS_CSS_FILTERS = [
    'compressor.filters.css_default.CssAbsoluteFilter',
    'compressor.filters.cleancss.CleanCSSFilter',
]
COMPRESS_CLEAN_CSS_BINARY = '/usr/bin/cleancss'
COMPRESS_CLEAN_CSS_ARGUMENTS = '--s0'