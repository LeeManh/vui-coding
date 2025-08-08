import { RegisterBody, RegisterResponse, SingInBody, SingInResponse } from "@/types/auth";
import { apiClient } from "./api-client";

export const signIn = async (body: SingInBody) =>
  apiClient.post<SingInResponse>("/auth/login", body);

export const register = async (body: RegisterBody) =>
  apiClient.post<RegisterResponse>("/auth/register", body);

export const signOut = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  await apiClient.post<void>("/auth/logout", { refreshToken });
};
