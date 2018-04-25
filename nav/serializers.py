from rest_framework import serializers
from nav.models import Nav, SubNav
import logging

from taggit_serializer.serializers import (TagListSerializerField,
                                           TaggitSerializer)

logger = logging.getLogger(__name__)


class NavSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nav
        fields = '__all__'


class NavDetailSerializer(TaggitSerializer, serializers.ModelSerializer):
    tags = TagListSerializerField()

    # def create(self, validated_data):
    #     logger.info('begin create Nav through DRF')
    #     logger.info(validated_data)
    #     res = super().create(validated_data)
    #     return res


    class Meta:
        model = Nav
        fields = '__all__'




class SubNavSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubNav
        fields = '__all__'