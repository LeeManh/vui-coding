import { Post } from "@/types/post.type";
import { PostCardSkeleton } from "./PostCardSkeleton";
import { PostCard } from "./PostCard";
import { Series } from "@/types/series.type";
import { DEFAULT_PAGE_LIMIT } from "@/constants/filter";

interface ListPostProps {
  posts?: Post[] | Series[];
  isLoading?: boolean;
  numberSkeleton?: number;
  isSeries?: boolean;
}

export const ListPost = ({
  posts,
  isLoading,
  numberSkeleton = DEFAULT_PAGE_LIMIT,
  isSeries,
}: ListPostProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {isLoading
        ? Array.from({ length: numberSkeleton }).map((_, index) => <PostCardSkeleton key={index} />)
        : posts?.map((post) => <PostCard key={post.id} post={post} isSeries={isSeries} />)}
    </div>
  );
};
