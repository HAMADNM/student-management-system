from rest_framework import generics, permissions, status
from rest_framework.response import Response


class HealthCheckView(generics.GenericAPIView):
    permission_classes = [permissions.AllowAny]
    authentication_classes = []

    def get(self, request):
        return Response(
            {"status": "ok", "message": "Student management backend is healthy"},
            status=status.HTTP_200_OK,
        )
