import { apiClient } from "./api-client.api";
import { ToggleReactionParams } from "@/types/reaction.type";

export const toggleReaction = (params: ToggleReactionParams) =>
  apiClient.post("reactions/toggle", params);
