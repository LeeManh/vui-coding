"use client";

import React from "react";
import CommentForm from "./CommentForm";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys.constant";
import { getCommentsPost } from "@/apis/comment.api";
import CommentItem from "./CommentItem";

const CommentsSection = ({ postId }: { postId: string }) => {
  const { data: dataComments } = useQuery({
    queryKey: [QUERY_KEYS.POSTS.COMMENTS, postId],
    queryFn: () => getCommentsPost(postId),
    enabled: !!postId,
  });
  const comments = dataComments?.data;

  return (
    <div>
      <div className="text-lg font-medium  mb-8">{dataComments?.meta.total} Comments</div>

      <CommentForm postId={postId} />

      <div className="space-y-8">
        {comments?.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default CommentsSection;
