import { CreateLikeBody } from "@/types/like.type";
import { apiClient } from "./api-client";

export const createLike = (body: CreateLikeBody) => apiClient.post("likes", body);
