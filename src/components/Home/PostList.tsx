"use client";

import { getPosts } from "@/apis/post";
import { QUERY_KEYS } from "@/constants/query-keys";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { PostCard, PostCardSkeleton } from "@/components/shared/posts";
import { Button } from "@/components/shared/Button";
import { ChevronRight } from "lucide-react";
import { SearchPost } from "@/components/home/search-post";
import Link from "next/link";
import { ROUTE_PATHS } from "@/constants/route-paths";
import { useSortParams } from "@/hooks/use-sort-params";
import SortTabs from "./sort-tabs";

const PostList = () => {
  const { sort, updateSort } = useSortParams();

  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.POSTS.ALL, { sort, limit: 7 }],
    queryFn: () => getPosts({ sort, limit: 7 }),
    placeholderData: keepPreviousData,
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <SortTabs value={sort} onValueChange={updateSort} />
        <SearchPost />
      </div>

      <div className="divide-y divide-border-default">
        {isLoading ? (
          <>
            {Array.from({ length: 7 }).map((_, index) => (
              <PostCardSkeleton key={index} />
            ))}
          </>
        ) : (
          <>
            {data?.data?.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </>
        )}
      </div>

      <Link href={ROUTE_PATHS.ARCHIVE}>
        <Button className="mt-4">
          <span>See all</span>
          <ChevronRight />
        </Button>
      </Link>
    </div>
  );
};

export default PostList;
