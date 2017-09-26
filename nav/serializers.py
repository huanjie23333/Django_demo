from rest_framework import serializers
from nav.models import Project


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'

    # def create(self, validated_data):
