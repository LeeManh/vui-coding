import { ListPostParams, ListPostRes, Post } from "@/types/post.type";
import { apiClient } from "./api-client.api";
import { SuccessRes } from "@/types/common.type";

export const getPosts = (params?: ListPostParams) =>
  apiClient.get<ListPostRes>("posts", { params });

export const getFeaturedPost = () => apiClient.get<SuccessRes<Post>>("posts/featured");

export const getPostDetail = (postId: string) => apiClient.get<SuccessRes<Post>>(`posts/${postId}`);
