from django.shortcuts import render

# Create your views here.
from rest_framework import generics, viewsets, permissions
from django.contrib.auth.models import User
from .models import Activity
from .serializers import (RegisterSerializer
# , ActivitySerializer
                          )

# REGISTER USER
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

# # CRUD FOR ACTIVITIES
# class ActivityViewSet(viewsets.ModelViewSet):
#     queryset = Activity.objects.all().order_by('-timestamp')
#     serializer_class = ActivitySerializer
#     permission_classes = [permissions.IsAuthenticated]
