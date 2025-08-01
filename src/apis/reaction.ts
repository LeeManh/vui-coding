import { apiClient } from "./api-client";
import { ToggleReactionParams } from "@/types/reaction";

export const toggleReaction = (params: ToggleReactionParams) =>
  apiClient.post("reactions/toggle", params);
