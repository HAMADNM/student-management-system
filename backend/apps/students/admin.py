from django.contrib import admin

from .models import Student


@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ("first_name", "last_name", "email", "grade", "is_active")
    list_filter = ("grade", "is_active")
    search_fields = ("first_name", "last_name", "email")
