from rest_framework import serializers

from dquote.models import DQoute


class DQouteSerializer(serializers.ModelSerializer):
    class Meta:
        model = DQoute
        fields = '__all__'
