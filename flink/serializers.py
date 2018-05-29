from rest_framework import serializers

from flink.models import Flink


class FlinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flink
        fields = '__all__'
