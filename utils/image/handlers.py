# coding=utf-8
import uuid
from django.utils.deconstruct import deconstructible
from django.utils.encoding import smart_str


@deconstructible
class UUIDFilename(object):
    def __init__(self, sub_path):
        self.sub_path = sub_path

    def __call__(self, instance, filename):
        ext = filename.split('.')[-1]
        # uuid_filename = uuid.uuid5(uuid.NAMESPACE_DNS, filename.encode('utf8'))
        uuid_filename = uuid.uuid5(uuid.NAMESPACE_DNS, smart_str(filename))
        filename = '{path}{filename}.{ext}'.format(path=self.sub_path,
                                                   filename=uuid_filename,
                                                   ext=ext)
        return filename
