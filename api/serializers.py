from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Activity

# -------------------
# User Serializer
# -------------------
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ("id", "username", "email", "password")

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data.get("email"),
            password=validated_data["password"]
        )
        return user

# class ActivitySerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Activity
#         fields = ['id', 'user', 'activity_type', 'status', 'timestamp']
#         read_only_fields = ['user', 'timestamp']
