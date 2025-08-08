import { GetMeResponse, UpdateMeBody } from "@/types/user.type";
import { apiClient } from "./api-client";

export const getMe = async () => apiClient.get<GetMeResponse>("/users/me");
export const updateMe = async (body: UpdateMeBody) => apiClient.patch("/users/me", body);
