import requests
import json
import logging
from django.conf import settings
from django import template

# from django.core.cache import cache

register = template.Library()

news_tag_api_url = getattr(settings, "NEWS_TAG_API_URL")
news_detail_api = getattr(settings, "NEWS_DETAIL_API")

logger = logging.getLogger('django')


@register.inclusion_tag("web/snippets/sidebar_news.html")
def show_sidebar_news():
    news = list()
    res = requests.get(news_detail_api, timeout=5)
    if res.status_code == 200:
        news = res.json()['results']
    return {
        "news_list": news
    }


@register.inclusion_tag("web/snippets/sidebar_news_tags.html")
def show_sidebar_news_tags():
    tags = list()
    tags_json_string = ""
    res = requests.get(news_tag_api_url, timeout=5)
    if res.status_code == 200:
        tags = res.json()['tags']
        tags_json_string = json.dumps(tags)
        # sidebar_tag_jsonstr
    return {
        "tag_list": tags,
        "": tags_json_string
    }