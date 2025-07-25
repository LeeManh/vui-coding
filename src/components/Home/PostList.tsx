"use client";

import { getPosts } from "@/apis/post.api";
import { QUERY_KEYS } from "@/constants/query-keys.constant";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import PostCard, { PostCardSkeleton } from "@/components/ui/Posts/PostCard";
import { Button } from "@/components/ui/Button";
import { ChevronRight } from "lucide-react";
import SearchPost from "@/components/ui/SearchPost";
import Link from "next/link";
import { ROUTE_PATHS } from "@/constants/route-paths.constant";
import { useSortParams } from "@/hooks/useSortParams";
import SortTabs from "../ui/SortTabs";

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
