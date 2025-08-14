"use client";

import React from "react";
import { getDetailSeries } from "@/apis/series.api";
import { QUERY_KEYS } from "@/constants/query-keys";
import { useQuery } from "@tanstack/react-query";
import PostHeaderInfo from "../post-details/header/PostHeaderInfo";
import Divider from "../shared/Divider";
import PostActionBar from "../post-details/header/PostActionBar";

interface DetailSeriesSectionProps {
  seriesId: string;
}

const DetailSeriesSection = ({ seriesId }: DetailSeriesSectionProps) => {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.SERIES.DETAIL, seriesId],
    queryFn: () => getDetailSeries(seriesId),
    enabled: !!seriesId,
  });

  if (isLoading) return <div>Loading...</div>;
  if (!data?.data) return <div>No series found</div>;

  return (
    <div>
      <PostHeaderInfo data={data.data} />
      <Divider className="my-4" />
      <PostActionBar data={data.data} isSeries />
      <Divider className="my-4" />
      <div className="space-y-4  text-lg">
        <div dangerouslySetInnerHTML={{ __html: data.data.content || "" }} />
      </div>
    </div>
  );
};

export default DetailSeriesSection;
