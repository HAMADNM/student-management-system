from django.urls import path

from .views import StudentDetailView, StudentListCreateView, StudentRestoreView, StudentAdminSearchView

urlpatterns = [
    path("", StudentListCreateView.as_view(), name="student-list-create"),
    path("search/", StudentAdminSearchView.as_view(), name="student-search"),
    path("<int:pk>/restore/", StudentRestoreView.as_view(), name="student-restore"),
    path("<int:pk>/", StudentDetailView.as_view(), name="student-detail"),
]
