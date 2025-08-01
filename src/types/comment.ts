import { MetaData, SuccessRes } from "./common";
import { Author } from "./user";

export interface Comment {
  id: string;
  content: string;
  userId: string;
  postId: string;
  parentId: string | null;
  createdAt: string;
  updatedAt: string;
  user: Author;
  replies: Comment[];
  likesCount: number;
  commentsCount: number;
  isLiked: boolean;
}

export type GetCommentsPostRes = SuccessRes<Comment[]> & { meta: MetaData };

export interface CreateCommentParams {
  postId: string;
  content: string;
  parentId?: string;
}
