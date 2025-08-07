"use client";

import { CustomPagination } from "@/components/shared/custom-pagination";
import { useQueryPosts } from "@/queries/post";
import { ListPost } from "@/components/shared/posts";
import { DEFAULT_PAGE_LIMIT } from "@/constants/filter";
import { ListPostParams } from "@/types/post.type";
import { useState } from "react";
import PopularPostsSection from "@/components/home/PopularPostsSection";
import ListTagsSection from "@/components/home/ListTagsSection";
import NewsletterSubscriptionSection from "@/components/home/NewsletterSubscriptionSection";

export default function Home() {
  const [filter, setFilter] = useState<ListPostParams>({
    limit: DEFAULT_PAGE_LIMIT,
    page: 1,
  });

  const { data, isLoading } = useQueryPosts(filter);

  return (
    <div className="flex gap-2">
      <div className="divide-y flex-1">
        <ListPost posts={data?.data} isLoading={isLoading} />

        <CustomPagination
          currentPage={filter.page!}
          totalPages={data?.meta.totalPages || 0}
          onPageChange={(page) => {
            setFilter({ ...filter, page });
          }}
          className="mt-4"
        />
      </div>

      <div className="max-w-xs w-full h-fit space-y-4">
        <PopularPostsSection />
        <ListTagsSection />
        <NewsletterSubscriptionSection />
      </div>
    </div>
  );
}
