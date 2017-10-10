from datetime import datetime
import pytz

from django.contrib.syndication.views import Feed
from django.utils.encoding import smart_str
from django.utils.html import strip_tags, escape
from django.utils.feedgenerator import Rss201rev2Feed
from web.views.news import NewsDataMixin

from xml.sax.saxutils import XMLGenerator



class SimplerXMLGenerator(XMLGenerator):
    def addQuickElement(self, name, contents=None, attrs=None, escape=False):
        "Convenience method for adding an element with no children"
        if attrs is None: attrs = {}
        self.startElement(name, attrs)
        if contents is not None:
            if escape:
                self.characters(contents)
            else:
                self._write(contents)
            # else:
            #     if not isinstance(contents, unicode):
            #         contents = unicode(contents, self._encoding)
            #     self._write(contents)
        self.endElement(name)


class NewsFeedGenerator(Rss201rev2Feed):
    mime_type = 'application/xml; charset=utf-8'

    def write(self, outfile, encoding):
        handler = SimplerXMLGenerator(outfile, encoding)
        handler.startDocument()
        handler.startElement("rss", self.rss_attributes())
        handler.startElement("channel", self.root_attributes())
        self.add_root_elements(handler)
        self.write_items(handler)
        self.endChannelElement(handler)
        handler.endElement("rss")

    def rss_attributes(self):
        attrs = super().rss_attributes()
        attrs['xmlns:content'] = 'http://purl.org/rss/1.0/modules/content/'
        attrs['xmlns:media'] = 'http://search.yahoo.com/mrss/'
        attrs['xmlns:georss'] = 'http://www.georss.org/georss'
        attrs['xmlns:dc'] = "http://purl.org/dc/elements/1.1/"
        return attrs

    def add_item_elements(self, handler, item):
        super().add_item_elements(handler, item)
        if item['content_encoded'] is not None:
            handler.addQuickElement(u'content:encoded', item['content_encoded'], escape=False)



class NewsFeed(NewsDataMixin, Feed):
    feed_type = NewsFeedGenerator
    title = "新闻快讯 - 区块链导航"
    link = "/news.htm"
    author_email = "hi@bit03.com"
    feed_copyright = "Blocks.tech 区块科技"
    description = "区块链导航, ChainDH 是汇集全网优质区块链项目网址及资源的中文上网导航。及时收录比特币 Bitcoin、比特币现金 Bitcoin Cash、莱特币 Litecoin、以太坊 Ethereum、经典以太币 Ethereum Classic 等区块链资产相关交易所、挖矿算力、当前交易价、交易数据统计及分析等分类的网址与内容，让你的区块链技术生活更简单直接。学习区块链，了解数字货币，从 ChainDH 开始。"

    def items(self):
        return self.get_news_page_list(page=1)
        # return News.objects.filter(status=News.STATUS.published)[:20]

    def item_title(self, item):
        return escape(item.get('title'))

    def item_link(self, item):
        return item.get('url')

    def item_pubdate(self, item):

        return datetime.fromtimestamp(item.get('published_at') + 3600*8,pytz.timezone('Asia/Shanghai'))

    def item_description(self, item):
        return item.get('content')

    def item_extra_kwargs(self, item):
        extra = {
            'content_encoded': ("<![CDATA[%s]]>" % smart_str(item.get('content'))),
        }
        return extra