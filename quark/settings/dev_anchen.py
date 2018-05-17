from .settings import *

DEBUG = True

SESSION_ENGINE  = 'django.contrib.sessions.backends.cache'


INSTALLED_APPS += [
    'debug_toolbar',
    'django_nose'
]



TEST_RUNNER = 'django_nose.NoseTestSuiteRunner'
NOSE_ARGS = [
    '--with-coverage',
    '--cover-package=web,nav,quark,feed',
]

# disable / enable debug toolbar
# INTERNAL_IPS =['127.0.0.1']
ALLOWED_HOSTS=['127.0.0.1','192.168.172.164','192.168.172.176','192.168.172.192','192.168.192.154']

DEBUG_TOOLBAR_PANELS = [
    'debug_toolbar.panels.versions.VersionsPanel',
    'debug_toolbar.panels.timer.TimerPanel',
    'debug_toolbar.panels.settings.SettingsPanel',
    'debug_toolbar.panels.headers.HeadersPanel',
    'debug_toolbar.panels.request.RequestPanel',
    'debug_toolbar.panels.sql.SQLPanel',
    'debug_toolbar.panels.staticfiles.StaticFilesPanel',
    'debug_toolbar.panels.templates.TemplatesPanel',
    'debug_toolbar.panels.cache.CachePanel',
    'debug_toolbar.panels.signals.SignalsPanel',
    'debug_toolbar.panels.logging.LoggingPanel',
    'debug_toolbar.panels.redirects.RedirectsPanel',
]

MIDDLEWARE.append('debug_toolbar.middleware.DebugToolbarMiddleware')


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
        'DIRS': ['/purgatory/quark/templates'],
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

STATIC_URL = '/static/'
STATIC_ROOT = '/purgatory/quark/static/'
STATICFILES_DIRS = []

Current_Dbhost = '127.0.0.1'
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'quark',
        'USER': 'root',
        'PASSWORD': 'mypass',
        'HOST': Current_Dbhost,
        'PORT': '3306',
        'OPTIONS': {
            'use_unicode':'utf8mb4',
            'init_command':'SET default_storage_engine=INNODB',
        },
        'TEST': {
            'CHARSET': 'utf8',
            'COLLATION': 'utf8_general_ci',
        },
    },
}


import os
# HAYSTACK_CONNECTIONS = {
#     'default': {
#         'ENGINE': 'haystack.backends.whoosh_backend.WhooshEngine',
#         'PATH': os.path.join(os.path.dirname(__file__), 'whoosh_index'),
#     },
# }

HAYSTACK_CONNECTIONS = {
    'default': {
        'ENGINE': 'haystack.backends.elasticsearch2_backend.Elasticsearch2SearchEngine',
        'URL': 'http://127.0.0.1:9200/',
        'INDEX_NAME': 'site',
        'BATCH_SIZE': 1000,
    },
}

LOGGING = {
    'version': 1,
    'disable_existing_loggers': True,
    'formatters': {
        'verbose': {
            'format': '%(levelname)s %(asctime)s %(module)s %(process)d %(thread)d %(message)s'
            # 'format': '[%(asctime)s.%(msecs)d] %(levelname)s [%(module)s:%(funcName)s:%(lineno)d]- %(message)s',
        },
        'error': {
            'format': '[%(asctime)s.%(msecs)d] [%(module)s:%(funcName)s:%(lineno)d]- %(message)s',
        },
    },
    'handlers': {
        'null': {
            'level': 'DEBUG',
            'class': 'logging.NullHandler',
        },
        'console': {
            'level': 'DEBUG',
            'class': 'logging.StreamHandler',
            'formatter': 'verbose'
        },
        'file': {
            'level': 'ERROR',
            'class': 'logging.FileHandler',
            'formatter': 'error',
            'filename': '/tmp/django.log',
            'mode': 'a',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['file', 'console'],
            'propagate': True,
            'level': 'CRITICAL',
        },
        'django.request': {
            'handlers': ['file', ],
            'level': 'ERROR',
            'propagate': True,
        },
    }
}


NEWS_TAG_API_URL = 'http://127.0.0.1:7000/api/news/tags.json'
NEWS_DETAIL_API = 'http://127.0.0.1:7000/api/news/'
