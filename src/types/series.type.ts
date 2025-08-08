import { SeriesStatus, SeriesVisibility } from "@/constants/series.constant";
import { ReactionType } from "./like.type";
import { Author } from "./user";
import { Post, Tag } from "./post.type";
import { MetaData, SuccessRes } from "./common";

export interface Series {
  id: string;
  title: string;
  description: string;
  content: string;
  slug: string;
  thumbnail: string;
  authorId: string;
  status: SeriesStatus;
  visibility: SeriesVisibility;
  likeCount: number;
  dislikeCount: number;
  bookmarkCount: number;
  bookmarkStatus: string;
  commentCount: number;
  reaction?: ReactionType;
  author: Author;
  posts: Post[];
  tags: Tag[];

  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  scheduledAt?: string;
}

export type GetListSeriesResponse = SuccessRes<Series[]> & { meta: MetaData };
