from haystack import indexes
from nav.models import Nav


class NavIndex(indexes.Indexable, indexes.SearchIndex):
    text = indexes.CharField(document=True, use_template=True)
    cname = indexes.CharField(model_attr='cname', default='')
    ename = indexes.CharField(model_attr='ename', default='')
    main_name = indexes.CharField(model_attr='main_name', boost=1.25)
    web_site = indexes.CharField(model_attr='web_site', default='')
    location = indexes.FacetCharField(model_attr='location')
    tags = indexes.FacetMultiValueField()
    rank = indexes.FacetIntegerField(model_attr='score', default=0)
    status = indexes.FacetCharField(model_attr='status')
    alias = indexes.CharField(model_attr='alias', default='')
    cate_id = indexes.FacetIntegerField(model_attr='cate_id')

    def get_model(self):
        return Nav

    def index_queryset(self, using=None):
        return self.get_model().objects.all()

    def prepare_tags(self, obj):
        return [o.name for o in obj.tags.all()]