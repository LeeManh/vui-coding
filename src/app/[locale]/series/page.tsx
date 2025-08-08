"use client";

import { getListSeries } from "@/apis/series.api";
import ListTagsSection from "@/components/home/ListTagsSection";
import NewsletterSubscriptionSection from "@/components/home/NewsletterSubscriptionSection";
import PopularPostsSection from "@/components/home/PopularPostsSection";
import { CustomPagination } from "@/components/shared/custom-pagination";
import { ListPost } from "@/components/shared/posts";
import { DEFAULT_PAGE_LIMIT } from "@/constants/filter";
import { QUERY_KEYS } from "@/constants/query-keys";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const SeriesPage = () => {
  const [filter, setFilter] = useState({
    limit: DEFAULT_PAGE_LIMIT,
    page: 1,
  });

  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.SERIES.LIST],
    queryFn: getListSeries,
  });

  return (
    <div className="flex gap-2">
      <div className="divide-y flex-1">
        <ListPost posts={data?.data} isLoading={isLoading} isSeries />

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
};

export default SeriesPage;
