from rest_framework import filters, generics, status
from rest_framework.response import Response

from .models import Student
from .pagination import StudentPagination
from .permissions import IsAdminOrReadOnlyStudent, IsAdminUserOnly
from .serializers import StudentSerializer


def filter_student_queryset(queryset, query_params, include_active_filter=False):
    if include_active_filter:
        is_active = query_params.get("is_active")
        if is_active in ("true", "false"):
            queryset = queryset.filter(is_active=is_active == "true")

    grade = query_params.get("grade")
    email = query_params.get("email")
    first_name = query_params.get("first_name")
    last_name = query_params.get("last_name")

    if grade:
        queryset = queryset.filter(grade__iexact=grade)
    if email:
        queryset = queryset.filter(email__icontains=email)
    if first_name:
        queryset = queryset.filter(first_name__icontains=first_name)
    if last_name:
        queryset = queryset.filter(last_name__icontains=last_name)

    return queryset


class StudentListCreateView(generics.ListCreateAPIView):
    serializer_class = StudentSerializer
    queryset = Student.objects.filter(is_active=True)
    pagination_class = StudentPagination
    permission_classes = [IsAdminOrReadOnlyStudent]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["first_name", "last_name", "email", "phone", "grade"]
    ordering_fields = ["first_name", "last_name", "grade", "created_at"]
    ordering = ["-created_at"]

    def get_queryset(self):
        queryset = super().get_queryset()
        return filter_student_queryset(queryset, self.request.query_params)


class StudentDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = StudentSerializer
    queryset = Student.objects.filter(is_active=True)
    permission_classes = [IsAdminOrReadOnlyStudent]

    def destroy(self, request, *args, **kwargs):
        student = self.get_object()
        student.is_active = False
        student.save(update_fields=["is_active", "updated_at"])
        return Response(
            {"message": "Student deleted successfully"},
            status=status.HTTP_200_OK,
        )


class StudentRestoreView(generics.GenericAPIView):
    serializer_class = StudentSerializer
    permission_classes = [IsAdminUserOnly]
    queryset = Student.objects.filter(is_active=False)

    def patch(self, request, pk):
        student = self.get_object()
        student.is_active = True
        student.save(update_fields=["is_active", "updated_at"])

        return Response(
            {"message": "Student restored successfully"},
            status=status.HTTP_200_OK,
        )


class StudentAdminSearchView(generics.ListAPIView):
    serializer_class = StudentSerializer
    pagination_class = StudentPagination
    permission_classes = [IsAdminUserOnly]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["first_name", "last_name", "email", "phone", "grade", "address"]
    ordering_fields = ["first_name", "last_name", "grade", "created_at", "updated_at"]
    ordering = ["-created_at"]

    def get_queryset(self):
        queryset = Student.objects.all()
        return filter_student_queryset(
            queryset,
            self.request.query_params,
            include_active_filter=True,
        )
