import { apiClient } from "./api-client";
import { CreateCommentParams, GetCommentsPostRes } from "@/types/comment";

export const getCommentsPost = (postId: string) =>
  apiClient.get<GetCommentsPostRes>(`comments/posts/${postId}`);

export const createComment = (params: CreateCommentParams) => apiClient.post("comments", params);
