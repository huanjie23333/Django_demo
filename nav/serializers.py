from rest_framework import serializers
from nav.models import Nav, SubNav
import logging

logger = logging.getLogger(__name__)


class NavSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nav
        fields = '__all__'
        # exclude = ("id", )

class NavDetailSerializer(serializers.ModelSerializer):
    tags = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='name'
    )
    class Meta:
        model = Nav
        fields = '__all__'




class SubNavSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubNav
        fields = '__all__'