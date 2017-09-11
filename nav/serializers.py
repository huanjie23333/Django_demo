from rest_framework import serializers
from nav.models import Dapps


class DappsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dapps
        fields = '__all__'