from rest_framework import serializers

from coinfork.models import CoinFork


class CoinForkSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoinFork
        fields = '__all__'
