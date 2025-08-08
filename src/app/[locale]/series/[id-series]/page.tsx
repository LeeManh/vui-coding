import CommentsSection from "@/components/post-details/comment/CommentsSection";
import DetailSeriesSection from "@/components/series/DetailSeriesSection";
import Divider from "@/components/shared/Divider";
import React from "react";

interface DetailSeriesPageProps {
  params: { "id-series": string };
}

const DetailSeriesPage = ({ params }: DetailSeriesPageProps) => {
  const seriesId = params["id-series"];

  return (
    <div>
      <DetailSeriesSection seriesId={seriesId} />
      <Divider className="my-4" />
      <CommentsSection targetId={seriesId} isSeries />
    </div>
  );
};

export default DetailSeriesPage;
