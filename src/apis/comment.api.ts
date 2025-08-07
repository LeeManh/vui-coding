import { apiClient } from "./api-client";
import { CreateCommentBody, GetCommentsPostRes } from "@/types/comment.type";

export const getCommentsPost = (postId: string) =>
  apiClient.get<GetCommentsPostRes>(`comments/posts/${postId}`);

export const createComment = (body: CreateCommentBody) => apiClient.post("comments", body);
