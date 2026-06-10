from django.contrib import admin
from django.urls import include, path

from apps.core.views import HealthCheckView


urlpatterns = [
    path("admin/", admin.site.urls),
    path("health/", HealthCheckView.as_view(), name="health"),
    path("api/health/", HealthCheckView.as_view(), name="api-health"),
    path("api/auth/", include("apps.accounts.urls")),
    path("api/students/", include("apps.students.urls")),
]
