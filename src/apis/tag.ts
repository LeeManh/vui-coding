import { apiClient } from "./api-client";
import { ListTagRes } from "@/types/tag";

export const getTags = async () => apiClient.get<ListTagRes>("/tags");
