import { Post } from "@/types/post.type";
import { PostCardSkeleton } from "./PostCardSkeleton";
import { PostCard } from "./PostCard";
import { Series } from "@/types/series.type";

interface ListPostProps {
  posts?: Post[] | Series[];
  isLoading?: boolean;
  numberSkeleton?: number;
  isSeries?: boolean;
}

export const ListPost = ({ posts, isLoading, numberSkeleton = 10, isSeries }: ListPostProps) => {
  return (
    <>
      {isLoading
        ? Array.from({ length: numberSkeleton }).map((_, index) => <PostCardSkeleton key={index} />)
        : posts?.map((post) => <PostCard key={post.id} post={post} isSeries={isSeries} />)}
    </>
  );
};
