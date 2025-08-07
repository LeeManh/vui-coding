import { PostStatus, PostVisibility } from "@/constants/post";
import { MetaData, QueryParams, SuccessRes } from "./common";
import { Author } from "./user";
import { ReactionType } from "./like.type";

export interface Tag {
  id: string;
  name: string;
}

// Main Post interface
export interface Post {
  id: string;
  title: string;
  description: string;
  slug: string;
  thumbnail?: string;
  content: string;
  authorId: string;
  status: PostStatus;
  visibility: PostVisibility;
  seriesId?: string;
  likeCount: number;
  dislikeCount: number;
  bookmarkCount: number;
  bookmarkStatus: string;
  commentCount: number;
  reaction?: ReactionType;
  author: Author;
  tags: Tag[];

  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  scheduledAt?: string;
}

export type ListPostRes = SuccessRes<Post[]> & { meta: MetaData };

export interface ListPostParams extends QueryParams {}
