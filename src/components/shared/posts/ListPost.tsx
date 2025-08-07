import { Post } from "@/types/post.type";
import { PostCardSkeleton } from "./PostCardSkeleton";
import { PostCard } from "./PostCard";

interface ListPostProps {
  posts?: Post[];
  isLoading?: boolean;
  numberSkeleton?: number;
}

export const ListPost = ({ posts, isLoading, numberSkeleton = 10 }: ListPostProps) => {
  return (
    <>
      {isLoading
        ? Array.from({ length: numberSkeleton }).map((_, index) => <PostCardSkeleton key={index} />)
        : posts?.map((post) => <PostCard key={post.id} post={post} />)}
    </>
  );
};
