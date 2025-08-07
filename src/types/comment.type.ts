import { CommentTargetType } from "@/constants/comment.constant";
import { MetaData, SuccessRes } from "./common";
import { Author } from "./user";
import { ReactionType } from "./like.type";

export interface Comment {
  id: string;
  content: string;
  userId: string;
  targetId: string;
  targetType: CommentTargetType;
  parentId: string | null;
  createdAt: string;
  updatedAt: string;
  user: Author;
  replies: Comment[];
  likeCount: number;
  dislikeCount: number;
  commentCount: number;
  reaction: ReactionType;
}

export type GetCommentsPostRes = SuccessRes<Comment[]> & { meta: MetaData };

export interface CreateCommentBody {
  targetId: string;
  targetType: CommentTargetType;
  content: string;
  parentId?: string;
}
