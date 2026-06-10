from django.urls import path

from .views import (
    StudentAdminSearchView,
    StudentDetailView,
    StudentListCreateView,
    StudentPermanentDeleteView,
    StudentRestoreView,
)

urlpatterns = [
    path("", StudentListCreateView.as_view(), name="student-list-create"),
    path("search/", StudentAdminSearchView.as_view(), name="student-search"),
    path("<int:pk>/restore/", StudentRestoreView.as_view(), name="student-restore"),
    path("<int:pk>/permanent-delete/", StudentPermanentDeleteView.as_view(), name="student-permanent-delete"),
    path("<int:pk>/", StudentDetailView.as_view(), name="student-detail"),
]
