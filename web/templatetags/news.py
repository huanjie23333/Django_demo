import requests
import json
import logging
from django.conf import settings
from django import template
from django.core.cache import cache

# from django.core.cache import cache

register = template.Library()

news_tag_api_url = getattr(settings, "NEWS_TAG_API_URL")
news_detail_api = getattr(settings, "NEWS_DETAIL_API")

logger = logging.getLogger('django')


def _get_news_list():
    news = list()
    res = requests.get(news_detail_api, timeout=5)
    if res.status_code == 200:
        news = res.json()['results']
    return news

@register.inclusion_tag("web/snippets/sidebar_news.html")
def show_sidebar_news():
    key = 'news:list:api:cache'
    news_list = cache.get_or_set(key, _get_news_list, timeout=60 * 30)
    return {
        "news_list": news_list
    }


def _get_tag_list():
    tags = list()
    res = requests.get(news_tag_api_url, timeout=5)
    if res.status_code == 200:
        tags = res.json()['tags']
    return tags


@register.inclusion_tag("web/snippets/sidebar_news_tags.html")
def show_sidebar_news_tags():
    key = 'news:tags:api:cahe'
    news_tag_list = cache.get_or_set(key, _get_tag_list, timeout=60*30)
    return {
        "tag_list": news_tag_list,
        # "sidebar_tag_jsonstr": tags_json_string
    }