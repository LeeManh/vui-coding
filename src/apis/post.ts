import { ListPostParams, ListPostRes, Post } from "@/types/post";
import { apiClient } from "./api-client";
import { SuccessRes } from "@/types/common";

export const getPosts = (params?: ListPostParams) =>
  apiClient.get<ListPostRes>("posts", { params });

export const getFeaturedPost = () => apiClient.get<SuccessRes<Post>>("posts/featured");

export const getPostDetail = (postId: string) => apiClient.get<SuccessRes<Post>>(`posts/${postId}`);
