from rest_framework import serializers
from nav.models import Nav
import logging

logger = logging.getLogger(__name__)


class NavSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nav
        fields = '__all__'
        # exclude = ("id", )


# class ProjectSerializer(serializers.ModelSerializer):
#     tags = serializers.ListField(source='tag_list', allow_empty=True)
#
#     class Meta:
#         model = Project
#         exclude = ("id",)
#
#     def create(self, validated_data):
#         tag_list = validated_data.pop('tag_list')
#         instance = super().create(validated_data)
#         for tag in tag_list:
#             instance.tags.add(tag)
#         return instance
