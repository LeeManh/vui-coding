"use client";

import { getPosts } from "@/apis/post";
import { PostCard, PostCardSkeleton } from "@/components/shared/posts";
import { QUERY_KEYS } from "@/constants/query-keys";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { SearchPost } from "@/components/home/search-post";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import Loader from "@/components/shared/loader";
import SortTabs from "@/components/home/sort-tabs";
import { useSortParams } from "@/hooks/use-sort-params";
import { MetaData } from "@/types/common";

const ArchivePage = () => {
  const { sort, updateSort } = useSortParams();
  console.log("sort", sort);

  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.POSTS.ALL, { sort }],
    queryFn: ({ pageParam = 1 }) => getPosts({ sort, page: pageParam }),
    getNextPageParam: (lastPage) => {
      const meta = lastPage?.meta as MetaData;
      return !!meta?.hasNext ? meta?.page + 1 : undefined;
    },
    initialPageParam: 1,
    placeholderData: keepPreviousData,
  });
  const posts = data?.pages?.flatMap((page) => page.data) || [];

  const { loadingRef } = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    threshold: 200,
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
            {Array.from({ length: 10 }).map((_, index) => (
              <PostCardSkeleton key={index} />
            ))}
          </>
        ) : (
          <>
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </>
        )}
      </div>

      {/* Loading indicator for infinite scroll */}
      {hasNextPage && (
        <div ref={loadingRef} className="flex justify-center py-8">
          {isFetchingNextPage ? <Loader /> : <div className="h-4" />}
        </div>
      )}
    </div>
  );
};

export default ArchivePage;
