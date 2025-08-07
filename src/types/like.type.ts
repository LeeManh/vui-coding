import { LikeTargetType } from "@/constants/like";

export interface CreateLikeBody {
  targetId: string;
  targetType: LikeTargetType;
  isDislike?: boolean;
}
export type ReactionType = "like" | "dislike" | null;
