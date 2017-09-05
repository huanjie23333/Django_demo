from .settings import *

DEBUG = False

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