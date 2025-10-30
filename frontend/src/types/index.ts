export interface User {
  id: string;
  username: string;
  email: string;
}

export interface Activity {
  id: number;
  user: string;
  activity_type: string;
  status: "planned" | "in progress" | "completed";
  timestamp: string;
}

export interface AuthResponse {
  access: string;
  refresh: string;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface ActivityPayload {
  user: string;
  activity_type: string;
  status: "planned" | "in progress" | "completed";
}
