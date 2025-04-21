"use client";
import { createContext, ReactNode, useContext, useState } from "react";
import { LoginInput } from "shared/schemas";
import api from "../utils/api";

interface AuthContextType {
  token: string | null;
  login: (data: LoginInput) => Promise<void>;
  logout: () => void;
  initialized: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
    return null;
  });

  const login = async (data: LoginInput) => {
    const res = await api.post("/auth/login", data);
    setToken(res.data.access_token);
    localStorage.setItem("token", res.data.access_token);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, initialized: true }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
