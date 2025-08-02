"use client";

import React from "react";
import { getPosts } from "@/apis/post";
import { QUERY_KEYS } from "@/constants/query-keys";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { PostCardPopular, PostCardPopularSkeleton } from "@/components/shared/posts";
import { SortType } from "@/constants/filter";
import { useRouter } from "next/navigation";
import { ROUTE_PATHS } from "@/constants/route-paths";

const paddings: Record<number, string> = {
  0: "pr-4",
  1: "px-4",
  2: "pl-4",
};

const PostListPopular = () => {
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.POSTS.POPULAR],
    queryFn: () => getPosts({ page: 1, limit: 3, sort: SortType.TOP }),
    placeholderData: keepPreviousData,
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="text-foreground font-medium">Most Popular</div>
        <div
          className="text-foreground text-xs leading-5 hover:underline duration-300 cursor-pointer underline-offset-2 font-light"
          onClick={() => router.push(`${ROUTE_PATHS.ARCHIVE}?sort=${SortType.TOP}`)}
        >
          VIEW ALL
        </div>
      </div>

      <div className="flex divide-x divide-border-default mt-4">
        {isLoading ? (
          <>
            <PostCardPopularSkeleton className={paddings[0]} />
            <PostCardPopularSkeleton className={paddings[1]} />
            <PostCardPopularSkeleton className={paddings[2]} />
          </>
        ) : (
          data?.data?.map((post, index) => {
            return <PostCardPopular key={post.id} post={post} className={paddings[index]} />;
          })
        )}
      </div>
    </div>
  );
};

export default PostListPopular;
