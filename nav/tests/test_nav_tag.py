from django.test import TestCase

from nav.models import Nav
from quark.tests.base import WithDataTestCase


class TestNavTagTestCase(WithDataTestCase):

    def test_nav_tag_ops(self):
        # see WithDataTestCase for default data setup
        self.assertEqual(set(self.nav.tags.names()),set(['tag1', 'tag2']))
        self.nav.tags.remove('tag1')
        self.nav.save()

        nav = Nav.objects.get(cname='foo')
        self.assertEqual(set(nav.tags.names()), set(['tag2']))
