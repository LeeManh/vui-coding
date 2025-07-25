"use client";

import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { Search } from "lucide-react";
import PostSearchItem, { PostSearchItemSkeleton } from "./PostSearchItem";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { getPosts } from "@/apis/post.api";
import { useState } from "react";
import { QUERY_KEYS } from "@/constants/query-keys.constant";
import EmptySearchPost from "./EmptySearchPost";
import Loader from "../Loader";

const defaultFilter = {
  search: "",
};

const SearchPost = () => {
  const [open, setOpen] = useState(false);
  const [tempSearch, setTempSearch] = useState("");
  const [filter, setFilter] = useState(defaultFilter);

  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.POSTS.ALL, filter],
    queryFn: ({ pageParam = 1 }) => getPosts({ ...filter, page: pageParam }),
    enabled: open,
    getNextPageParam: (lastPage) => {
      const meta = lastPage.meta;
      return meta?.hasNext ? meta?.page + 1 : undefined;
    },
    initialPageParam: 1,
    placeholderData: keepPreviousData,
  });

  const posts = data?.pages.flatMap((page) => page.data) || [];

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollTop + clientHeight >= scrollHeight - 5 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const resetSearch = () => {
    setFilter(defaultFilter);
    setTempSearch("");
  };

  return (
    <Dialog
      onOpenChange={(open) => {
        setOpen(open);

        if (!open) resetSearch();
      }}
    >
      <form>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon">
            <Search className="w-5 h-5" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-2xl p-0" showCloseButton={false}>
          <DialogTitle className="sr-only">Search Posts</DialogTitle>
          <div className="w-full h-12 flex items-center gap-2 p-4 border-b ">
            <Search
              className="w-5 h-5 text-gray-400 cursor-pointer"
              onClick={() => setFilter({ ...filter, search: tempSearch })}
            />
            <Input
              value={tempSearch}
              onChange={(e) => setTempSearch(e.target.value)}
              placeholder="Search posts"
              className="border-none outline-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none w-full h-full"
              onKeyDown={(e) => {
                if (e.key === "Enter") setFilter({ ...filter, search: tempSearch });
              }}
            />
          </div>

          <div className="px-2 pb-2 h-[400px] overflow-y-auto" onScroll={handleScroll}>
            {isLoading ? (
              <>
                {Array.from({ length: 10 }).map((_, index) => (
                  <PostSearchItemSkeleton key={index} />
                ))}
              </>
            ) : (
              <>
                {posts.length === 0 && (
                  <div className="flex items-center justify-center h-full">
                    <EmptySearchPost />
                  </div>
                )}
                {posts.map((post) => (
                  <PostSearchItem key={post.id} post={post} />
                ))}
                {isFetchingNextPage && <Loader />}
              </>
            )}
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default SearchPost;
