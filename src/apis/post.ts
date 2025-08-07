import { ListPostParams, ListPostRes, Post } from "@/types/post.type";
import { apiClient } from "./api-client";
import { SuccessRes } from "@/types/common";

export const getPosts = (params?: ListPostParams) =>
  apiClient.get<ListPostRes>("posts", { params });

export const getPostDetail = (postId: string) => apiClient.get<SuccessRes<Post>>(`posts/${postId}`);
