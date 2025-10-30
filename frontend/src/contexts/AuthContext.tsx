import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User } from "@/types";

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (username: string, token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");
    const storedUsername = localStorage.getItem("username");

    if (storedToken && storedUsername) {
      setToken(storedToken);
      setUser({ id: "", username: storedUsername, email: "" });
    }
  }, []);

  const login = (username: string, accessToken: string) => {
    setUser({ id: "", username, email: "" });
    setToken(accessToken);
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("username", username);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("access_token");
    localStorage.removeItem("username");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
