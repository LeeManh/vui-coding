"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "@/types/user";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import { getMe, signOut } from "@/apis/auth";
import { useRouter } from "next/navigation";
import { ROUTE_PATHS } from "@/constants/route-paths";
import { useLogoutMutation } from "@/mutations/auth";

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  setAuth: (tokens: { accessToken: string; refreshToken: string }) => void;
  logout: () => void;
  isLoadingUser: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  const { data: userData, isLoading: isLoadingUser } = useQuery({
    queryKey: [QUERY_KEYS.AUTH.ME],
    queryFn: getMe,
    enabled: !!accessToken,
  });

  const { logoutMutation } = useLogoutMutation();

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedAccessToken = localStorage.getItem("accessToken");
      const storedRefreshToken = localStorage.getItem("refreshToken");

      if (storedAccessToken) {
        setAccessToken(storedAccessToken);
        setRefreshToken(storedRefreshToken);
      }
    }
  }, []);

  // Update user state when userData changes
  useEffect(() => {
    if (userData) {
      setUser(userData.data);
    }
  }, [userData]);

  const setAuth = (tokens: { accessToken: string; refreshToken: string }) => {
    // Update state
    setAccessToken(tokens.accessToken);
    setRefreshToken(tokens.refreshToken);

    // Save to localStorage
    localStorage.setItem("accessToken", tokens.accessToken);
    localStorage.setItem("refreshToken", tokens.refreshToken);

    // Invalidate and refetch user data
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.AUTH.ME] });
  };

  const clearAuth = () => {
    // Clear user state
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);

    // Clear localStorage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    // Clear query cache
    queryClient.removeQueries({ queryKey: [QUERY_KEYS.AUTH.ME] });
  };

  const logout = async () => {
    try {
      await logoutMutation.mutateAsync();
    } finally {
      clearAuth();
      router.push(ROUTE_PATHS.AUTH.SIGN_IN);
    }
  };

  const isAuthenticated = !!accessToken;

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        refreshToken,
        isAuthenticated,
        setAuth,
        logout,
        isLoadingUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
