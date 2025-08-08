import React from "react";
import Divider from "@/components/shared/Divider";
import CommentsSection from "@/components/post-details/comment/CommentsSection";
import PostDetailsSection from "@/components/post-details/PostDetailsSection";

interface PostDetailPageProps {
  params: { "id-post": string };
}

const PostDetailPage = ({ params }: PostDetailPageProps) => {
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
