import { apiClient } from "./api-client.api";
import { CreateCommentParams, GetCommentsPostRes } from "@/types/comment.type";

export const getCommentsPost = (postId: string) =>
  apiClient.get<GetCommentsPostRes>(`comments/posts/${postId}`);

export const createComment = (params: CreateCommentParams) => apiClient.post("comments", params);
