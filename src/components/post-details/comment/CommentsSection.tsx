"use client";

import React from "react";
import CommentForm from "./CommentForm";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import { getCommentsPost, getCommentsSeries } from "@/apis/comment.api";
import CommentItem from "./CommentItem";
import { useTranslations } from "next-intl";
import _ from "lodash";

interface CommentSectionProps {
  targetId: string;
  isSeries?: boolean;
}

const ID_COMMENT = "comments-section";
const CommentsSection = ({ targetId, isSeries }: CommentSectionProps) => {
  const t = useTranslations();

  const { data: dataComments } = useQuery({
    queryKey: [QUERY_KEYS.POSTS.COMMENTS, targetId],
    queryFn: () => (isSeries ? getCommentsSeries(targetId) : getCommentsPost(targetId)),
    enabled: !!targetId,
  });
  const comments = dataComments?.data;

  return (
    <div id={ID_COMMENT}>
      <div className="text-lg font-medium  mb-8">
        {_.capitalize(t("Common.comments"))} ({dataComments?.meta.total})
      </div>

      <CommentForm targetId={targetId} isSeries={isSeries} />

      <div className="space-y-8">
        {comments?.map((comment) => (
          <CommentItem key={comment.id} comment={comment} isSeries={isSeries} />
        ))}
      </div>
    </div>
  );
};

export default CommentsSection;
