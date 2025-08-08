import { apiClient } from "./api-client";
import { CreateCommentBody, GetCommentsRes } from "@/types/comment.type";

export const getCommentsPost = (postId: string) =>
  apiClient.get<GetCommentsRes>(`comments/posts/${postId}`);
export const getCommentsSeries = (seriesId: string) =>
  apiClient.get<GetCommentsRes>(`comments/series/${seriesId}`);

export const createComment = (body: CreateCommentBody) => apiClient.post("comments", body);
