import { Activity, ActivityPayload, AuthResponse, LoginPayload, RegisterPayload, User } from "@/types";

const API_BASE_URL = "https://trackfitness-backend-latest-4.onrender.com/api";

export const api = {
  auth: {
    register: async (data: RegisterPayload): Promise<User> => {
      const response = await fetch(`${API_BASE_URL}/auth/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Registration failed");
      }

      return response.json();
    },

    login: async (data: LoginPayload): Promise<AuthResponse> => {
      const response = await fetch(`${API_BASE_URL}/auth/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Login failed");
      }

      return response.json();
    },
  },

  activities: {
    getAll: async (token: string): Promise<Activity[]> => {
      const response = await fetch(`${API_BASE_URL}/activities/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch activities");
      }

      return response.json();
    },

    create: async (token: string, data: ActivityPayload): Promise<Activity> => {
      const response = await fetch(`${API_BASE_URL}/activities/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create activity");
      }

      return response.json();
    },

    update: async (token: string, id: number, data: ActivityPayload): Promise<Activity> => {
      const response = await fetch(`${API_BASE_URL}/activities/${id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to update activity");
      }

      return response.json();
    },

    delete: async (token: string, id: number): Promise<void> => {
      const response = await fetch(`${API_BASE_URL}/activities/${id}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete activity");
      }
    },
  },
};
