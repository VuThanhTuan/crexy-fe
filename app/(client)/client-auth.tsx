"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getPublicApi, getClientApi } from "@/common/axios";
import type { User, LoginCredentials, RegisterData, AuthResponse } from "@/types/user";

type AuthContextValue = {
  token: string | null;
  user: User | null;
  isInitialized: boolean;
  isAuthenticating: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  loginWithGoogle: (credential: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // Fetch user info from API instead of localStorage
  const fetchUserInfo = useCallback(async () => {
    try {
      // getClientApi() automatically adds Authorization header from localStorage
      const api = getClientApi();
      const response = await api.get<{ data: User }>("/users/me");

      if (response?.data?.data) {
        setUser(response.data.data);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Failed to fetch user info:", error);
      // If token is invalid, clear it (handled by interceptor, but double-check)
      if (error && typeof error === 'object' && 'response' in error) {
        const response = (error as { response?: { status?: number } }).response;
        if (response?.status === 401) {
          setToken(null);
          setUser(null);
        }
      }
      return false;
    }
  }, []);

  // Initialize: Check token and fetch fresh user data from API
  useEffect(() => {
    if (typeof window === "undefined") return;

    const initializeAuth = async () => {
      const existingToken = localStorage.getItem(TOKEN_KEY);

      if (existingToken) {
        setToken(existingToken);
        // Fetch fresh user data from API (token is auto-added by getClientApi)
        await fetchUserInfo();
      }

      setIsInitialized(true);
    };

    initializeAuth();
  }, [fetchUserInfo]);

  const saveAuthData = useCallback((data: AuthResponse) => {
    const { accessToken, refreshToken, user: userData } = data;

    // Only save tokens, not user data
    localStorage.setItem(TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);

    setToken(accessToken);
    setUser(userData);
  }, []);

  const clearAuthData = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);

    setToken(null);
    setUser(null);
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    setIsAuthenticating(true);
    try {
      const api = getPublicApi();
      const response = await api.post<{ data: AuthResponse }>("/auth/login", credentials);

      if (!response?.data?.data) {
        throw new Error("Invalid response from server");
      }

      saveAuthData(response.data.data);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsAuthenticating(false);
    }
  }, [saveAuthData]);

  const register = useCallback(async (data: RegisterData) => {
    setIsAuthenticating(true);
    try {
      const api = getPublicApi();
      const response = await api.post<{ data: AuthResponse }>("/auth/register", data);

      if (!response?.data?.data) {
        throw new Error("Invalid response from server");
      }

      saveAuthData(response.data.data);
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    } finally {
      setIsAuthenticating(false);
    }
  }, [saveAuthData]);

  const loginWithGoogle = useCallback(async (credential: string) => {
    setIsAuthenticating(true);
    try {
      const api = getPublicApi();
      const response = await api.post<{ data: AuthResponse }>("/auth/google", {
        token: credential,
      });

      if (!response?.data?.data) {
        throw new Error("Invalid response from server");
      }

      saveAuthData(response.data.data);
    } catch (error) {
      console.error("Google login error:", error);
      throw error;
    } finally {
      setIsAuthenticating(false);
    }
  }, [saveAuthData]);

  const logout = useCallback(() => {
    clearAuthData();
  }, [clearAuthData]);

  const refreshUser = useCallback(async () => {
    if (!token) return;

    await fetchUserInfo();
  }, [token, fetchUserInfo]);

  const isAuthenticated = useMemo(() => !!token && !!user, [token, user]);

  const value = useMemo<AuthContextValue>(
    () => ({
      token,
      user,
      isInitialized,
      isAuthenticating,
      isAuthenticated,
      login,
      register,
      loginWithGoogle,
      logout,
      refreshUser,
    }),
    [token, user, isInitialized, isAuthenticating, isAuthenticated, login, register, loginWithGoogle, logout, refreshUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
