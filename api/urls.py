from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (RegisterView
 , ActivityViewSet
                    )
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = DefaultRouter()
# router.register("activities", ActivityViewSet, basename="activities")
#Register Url for Activity Create and Update and Delete
router.register("activities", ActivityViewSet, basename="activity")

urlpatterns = [
    path("auth/register/", RegisterView.as_view(), name="auth_register"),
    path("auth/login/", TokenObtainPairView.as_view(), name="auth_login"),
    path("auth/refresh/", TokenRefreshView.as_view(), name="auth_refresh"),
    path("", include(router.urls)),
]

