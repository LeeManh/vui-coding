"use client";

import React from "react";
import Divider from "@/components/shared/Divider";
import { useParams } from "next/navigation";
import CommentsSection from "@/components/post-details/comment/CommentsSection";
import PostDetailsSection from "@/components/post-details/PostDetailsSection";

const PostDetailPage = () => {
  const params = useParams<{ "id-post": string }>();
  const postId = params["id-post"];

  return (
    <div>
      <PostDetailsSection postId={postId} />

      <Divider className="my-4" />

      <CommentsSection postId={postId} />
    </div>
  );
};

export default PostDetailPage;
