"use client";

import React from "react";
import { getFeaturedPost } from "@/apis/post";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import { PostCardFeatured, PostCardFeaturedSkeleton } from "@/components/shared/posts";

const PostListFeatured = () => {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.POSTS.FEATURED],
    queryFn: getFeaturedPost,
    placeholderData: keepPreviousData,
  });

  if (isLoading) return <PostCardFeaturedSkeleton />;

  return <div>{data && <PostCardFeatured post={data.data} />}</div>;
};

export default PostListFeatured;
