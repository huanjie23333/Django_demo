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
    main_name = serializers.ReadOnlyField()
    class Meta:
        model = Nav
        fields = '__all__'




class SubNavSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubNav
        fields = '__all__'