"use client";

import React from "react";
import AvatarUser from "../ui/AvatarUser";
import { Button } from "@/components/ui/Button";
import Divider from "@/components/ui/Divider";
import { Bookmark, Heart, MessageCircle, Share } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { formatFullDate } from "@/lib/date";
import { cn } from "@/lib/utils";
import { useOptimisticPostLike } from "@/hooks/useOptimisticPostLike";
import { ReactionTarget } from "@/types/reaction.type";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys.constant";
import { getPostDetail } from "@/apis/post.api";

interface PostDetailsSectionProps {
  postId: string;
}

const PostDetailsSection = ({ postId }: PostDetailsSectionProps) => {
  const { user } = useAuth();

  const { data } = useQuery({
    queryKey: [QUERY_KEYS.POSTS.DETAIL, postId],
    queryFn: () => getPostDetail(postId),
    enabled: !!postId,
    placeholderData: keepPreviousData,
  });
  const post = data?.data;

  const toggleLikeMutation = useOptimisticPostLike(postId);
  const handleToggleLike = () => {
    toggleLikeMutation.mutate({
      targetId: postId,
      targetType: ReactionTarget.POST,
    });
  };

  return (
    <section>
      <div className="space-y-3">
        <h1 className=" text-3xl font-bold">{post?.title}</h1>
        <div className=" text-lg ">{post?.subTitle}</div>
        <div className="flex items-center gap-2">
          <AvatarUser avatar={post?.author.avatar} username={post?.author.username} />

          <div className="space-y-1">
            <h3>{user?.username}</h3>
            <div className="text-xs  line-clamp-1">
              {formatFullDate(post?.createdAt)} • 10 min read
            </div>
          </div>
        </div>
      </div>
      <Divider className="my-4" />
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          className={cn(
            "text-xs rounded-full w-[60px]",
            post?.isLiked && "text-red-500 hover:text-red-600"
          )}
          onClick={handleToggleLike}
        >
          <Heart className={cn("w-4 h-4", post?.isLiked && "fill-red-500")} />
          <span>{post?.likesCount}</span>
        </Button>

        <Button variant="outline" className="rounded-full">
          <MessageCircle className="w-4 h-4" />
          <span>{post?.commentsCount}</span>
        </Button>
        <Button variant="outline" className="rounded-full">
          <Share className="w-4 h-4" />
        </Button>
        <Button variant="outline" className="rounded-full">
          <Bookmark className="w-4 h-4" />
        </Button>
      </div>
      <Divider className="my-4" />
      <div className="space-y-4 font-mono text-lg">
        <div dangerouslySetInnerHTML={{ __html: post?.content || "" }} />
      </div>
    </section>
  );
};

export default PostDetailsSection;
