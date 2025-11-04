"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getAdminApi } from "@/common/axios";

type AdminUser = {
  // Extend with your real user fields when BE returns them
  email?: string;
  id?: string | number;
};

type AdminAuthContextValue = {
  token: string | null;
  user: AdminUser | null;
  isInitialized: boolean;
  isAuthenticating: boolean;
  login: (params: { email: string; password: string }) => Promise<void>;
  logout: () => void;
};

const AdminAuthContext = createContext<AdminAuthContextValue | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // Initialize from localStorage on mount
  useEffect(() => {
    const existing = typeof window !== "undefined" ? localStorage.getItem("jwt_token") : null;
    if (existing) setToken(existing);
    setIsInitialized(true);
  }, []);

  const login = useCallback(async ({ email, password }: { email: string; password: string }) => {
    setIsAuthenticating(true);
    try {
      const api = getAdminApi();
      const response = await api.post("/admin/auth/login", { email, password });
      const newToken: string | undefined = response?.data?.data?.accessToken;
      const newUser: AdminUser | undefined = response?.data?.user;
      if (!newToken) throw new Error("Missing access token from server response");

      localStorage.setItem("jwt_token", newToken);
      setToken(newToken);
      if (newUser) setUser(newUser);
    } finally {
      setIsAuthenticating(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("jwt_token");
    setToken(null);
    setUser(null);
  }, []);

  const value = useMemo<AdminAuthContextValue>(
    () => ({ token, user, isInitialized, isAuthenticating, login, logout }),
    [token, user, isInitialized, isAuthenticating, login, logout]
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuth(): AdminAuthContextValue {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return ctx;
}


