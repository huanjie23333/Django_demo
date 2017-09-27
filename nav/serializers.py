from rest_framework import serializers
from nav.models import Project
import logging

logger = logging.getLogger(__name__)


class ProjectSerializer(serializers.ModelSerializer):
    tags = serializers.ListField(source='tag_list', allow_empty=True)

    class Meta:
        model = Project
        fields = '__all__'

    def create(self, validated_data):
        tag_list = validated_data.pop('tag_list')
        instance = super().create(validated_data)
        for tag in tag_list:
            instance.tags.add(tag)
        return instance
