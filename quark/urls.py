"""quark URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include, handler404, handler500
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
# from django.views.decorators.cache import cache_page

from web.views import ( CategoryView, SiteMapView, IndexView,
                        SubNavCreateView, SubNavSuccessView, CountDownList,
                        ForkListView, D3TestView, CryptoindexView)

from web.views.news import NewsListView

from quark.views import page_error, webpage_not_found

handler404 = webpage_not_found
handler500 = page_error

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    # url(r'^about\.htm$', AboutView.as_view(), name='web_about'),
    # url(r'^recruit\.htm$', JobView.as_view(), name='web_jobs'),
    url(r'^sitemap\.htm$', SiteMapView.as_view(), name='web_sitemap'),
    url(r'^submit\.htm$', SubNavCreateView.as_view(), name='web_submit'),
    url(r'^submit_suc\.htm$', SubNavSuccessView.as_view(), name='web_submit_done'),
    url(r'^news\.htm', NewsListView.as_view(), name='web_news'),
    url(r'^countdown\.htm', CountDownList.as_view(), name='web_btc_countdown'),
    url(r'^fork_list\.htm', ForkListView.as_view(), name='web_fork_list'),
    # url(r'^category/(?P<cate_ename>[a-zA-Z_]+)\.htm$', CategoryView.as_view(), name='category_page'),
    url(r'^category/(?P<cate_ename>\w+)\.htm$', CategoryView.as_view(), name='category_page'),

    url(r'^news/', include('web.urls.news', namespace='news')),
    # url(r'^dapp/', include('web.urls.dapp', namespace='dapp')),

    url(r'^search/', include('web.urls.search', namespace='search')),
    url(r'^feed/', include('feed.urls', namespace='feed')),
    url(r'^tools/', include('webtools.urls', namespace='tools')),
    url(r'^token_sale_history/', D3TestView.as_view(), name='d3_test'),
    url(r'^crypto_index/', CryptoindexView.as_view(), name='crypto_index'),

]

urlpatterns += [
    url(r'^api/nav/', include('nav.urls.api.web_site', namespace='api_nav')),
]

# captcha
urlpatterns += [
    url(r'^captcha/', include('captcha.urls')),
]

urlpatterns += [
    url(r'^$', IndexView.as_view(), name='web_index'),
    # url(r'^test_index$', TestIndexView.as_view(), name='web_index_test'),
    # url(r'^$', cache_page(1800)(IndexView.as_view()), name='web_index'),
]

from django.contrib.flatpages import views

urlpatterns += [
    url(r'^pages/(?P<url>.*/?)$', views.flatpage),
]

if settings.IS_LOCAL_TESTING:
    urlpatterns = urlpatterns + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    # for local testing 500 page
    from web.views import ErrorView

    urlpatterns = urlpatterns + [
        url(r'^error\.htm$', ErrorView.as_view(), name='web_error_testing'),
    ]

if settings.DEBUG:
    import debug_toolbar
    urlpatterns = [
                      url(r'^__debug__/', include(debug_toolbar.urls)),
                  ] + urlpatterns
