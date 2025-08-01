import { MetaData, SortType, SuccessRes } from "./common";
import { Author } from "./user";

export interface Post {
  id: string;
  title: string;
  subTitle: string;
  slug: string;
  thumbnail: string;
  content: string;
  authorId: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
  commentsCount: number;
  likesCount: number;
  isLiked: boolean;
  author: Author;
}

export type ListPostRes = SuccessRes<Post[]> & { meta: MetaData };

export interface ListPostParams {
  sort?: SortType;
  limit?: number;
  page?: number;
  search?: string;
}
