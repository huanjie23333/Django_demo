from .settings import *



SESSION_ENGINE          = 'django.contrib.sessions.backends.cache'


INSTALLED_APPS += [
    'debug_toolbar',
]

INTERNAL_IPS =['127.0.0.1']

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
        'NAME': 'quark',
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

