from rest_framework import serializers
from django.utils import timezone

from .models import Student


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = "__all__"
        read_only_fields = ("id", "is_active", "created_at", "updated_at")

    def validate_phone(self, value):
        if value and not value.isdigit():
            raise serializers.ValidationError(
                "Phone number must contain only digits."
            )
        return value

    def validate_date_of_birth(self, value):
        if value > timezone.localdate():
            raise serializers.ValidationError(
                "Date of birth cannot be in the future."
            )
        return value
