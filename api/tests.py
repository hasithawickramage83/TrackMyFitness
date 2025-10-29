from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from django.contrib.auth.models import User
from .models import Activity

class UserAuthTests(APITestCase):

    def test_register_user(self):
        url = reverse('auth_register')
        data = {"username": "john", "password": "12345"}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(User.objects.filter(username="john").exists())

    def test_login_user(self):
        User.objects.create_user(username="john", password="12345")
        url = reverse('auth_login')
        data = {"username": "john", "password": "12345"}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.data)
        self.assertIn("refresh", response.data)


class ActivityTests(APITestCase):

    def setUp(self):
        # Create and login user
        self.user = User.objects.create_user(username="john", password="12345")
        login_url = reverse('auth_login')
        login_resp = self.client.post(login_url, {"username": "john", "password": "12345"}, format='json')
        self.token = login_resp.data['access']
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')

    def test_create_activity(self):
        url = reverse('activity-list')
        data = {
            "user": self.user.username,
            "activity_type": "Workout",
            "status": "planned"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Activity.objects.count(), 1)
        self.assertEqual(Activity.objects.get().activity_type, "Workout")

    def test_get_activities(self):
        Activity.objects.create(user=self.user.username, activity_type="Meal", status="completed")
        url = reverse('activity-list')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)

    def test_update_activity(self):
        activity = Activity.objects.create(user=self.user.username, activity_type="Workout", status="planned")
        url = reverse('activity-detail', args=[activity.id])
        data = {"status": "completed"}
        response = self.client.patch(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        activity.refresh_from_db()
        self.assertEqual(activity.status, "completed")

    def test_delete_activity(self):
        activity = Activity.objects.create(user=self.user.username, activity_type="Workout", status="planned")
        url = reverse('activity-detail', args=[activity.id])
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Activity.objects.count(), 0)
