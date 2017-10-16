from flink.models import Flink

class FlinkMixin(object):
    def get_flinks(self):
        return Flink.objects.all()

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context.update({
            'flinks': self.get_flinks()
        })
        return context
