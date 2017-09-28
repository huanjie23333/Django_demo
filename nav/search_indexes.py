from haystack import indexes
from nav.models import Nav


class NavIndex(indexes.Indexable, indexes.SearchIndex):
    text = indexes.CharField(document=True, use_template=True)
    cname = indexes.CharField(boost=1.25)
    ename = indexes.CharField(boost=1.25)
    tags = indexes.FacetMultiValueField()

    def get_model(self):
        return Nav

    def index_queryset(self, using=None):
        return self.get_model().objects.all()

    def prepare_tags(self, obj):
        return [o.name for o in obj.tags.all()]