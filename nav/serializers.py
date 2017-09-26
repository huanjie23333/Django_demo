from rest_framework import serializers
from nav.models import Project


class ProjectSerializer(serializers.ModelSerializer):
    tags = serializers.ListField(source='tag_list')

    class Meta:
        model = Project
        fields = '__all__'

    def create(self, validated_data):
