"use client";

import React from "react";
import Divider from "@/components/shared/Divider";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import { getPostDetail } from "@/apis/post";
import PostHeaderInfo from "./header/PostHeaderInfo";
import PostActionBar from "./header/PostActionBar";

interface PostDetailsSectionProps {
  postId: string;
}

const PostDetailsSection = ({ postId }: PostDetailsSectionProps) => {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.POSTS.DETAIL, postId],
    queryFn: () => getPostDetail(postId),
    enabled: !!postId,
    placeholderData: keepPreviousData,
  });
  const post = data?.data;

  if (isLoading) return <div>Loading...</div>;
  if (!post) return <div>No post found</div>;

  return (
    <section>
      <PostHeaderInfo data={post} />
      <Divider className="my-4" />
      <PostActionBar data={post} />
      <Divider className="my-4" />
      <div className="space-y-4 text-lg">
        <div dangerouslySetInnerHTML={{ __html: post?.content || "" }} />
      </div>
    </section>
  );
};

export default PostDetailsSection;
