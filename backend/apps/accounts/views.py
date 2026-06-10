from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import CustomTokenSerializer, LogoutSerializer


class LoginView(TokenObtainPairView):
    serializer_class = CustomTokenSerializer


class LogoutView(generics.GenericAPIView):
    serializer_class = LogoutSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        refresh = RefreshToken(serializer.validated_data["refresh"])
        refresh.blacklist()

        return Response(
            {"message": "Logout successful"},
            status=status.HTTP_200_OK,
        )
