from flink.models import Flink

def flink_proc(request):
    fls = Flink.objects.all()
    if len(fls):
        return {'flinks': fls}
    else:
        return {'flinks': None}
