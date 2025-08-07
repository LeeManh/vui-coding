"use client";

import React from "react";
import { AvatarUser } from "@/components/shared/avatar-user";
import { Button } from "@/components/shared/Button";
import Divider from "@/components/shared/Divider";
import { Bookmark, MessageCircle, Share, ThumbsDown, ThumbsUp } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { formatFullDate } from "@/lib/date";
import { cn } from "@/lib/utils";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import { getPostDetail } from "@/apis/post";
import { ReactionType } from "@/constants/reaction";
import { createLike } from "@/apis/like";
import { LikeTargetType } from "@/constants/like";
import { createBookmark } from "@/apis/bookmark.api";
import { BookmarkStatus, BookmarkTargetType } from "@/constants/bookmark.constant";
import { calculateReadingTime } from "@/lib/reading-time";
import { useTranslations } from "next-intl";

interface PostDetailsSectionProps {
  postId: string;
}

const PostDetailsSection = ({ postId }: PostDetailsSectionProps) => {
  const t = useTranslations();
  const { user } = useAuth();

  const { data, refetch } = useQuery({
    queryKey: [QUERY_KEYS.POSTS.DETAIL, postId],
    queryFn: () => getPostDetail(postId),
    enabled: !!postId,
    placeholderData: keepPreviousData,
  });
  const post = data?.data;

  const createLikeMutation = useMutation({
    mutationFn: createLike,
    onSuccess() {
      refetch();
    },
  });

  const createBookmarkMutation = useMutation({
    mutationFn: createBookmark,
    onSuccess() {
      refetch();
    },
  });

  return (
    <section>
      <div className="space-y-3">
        <h1 className=" text-3xl font-bold">{post?.title}</h1>
        <div className=" text-lg ">{post?.description}</div>
        <div className="flex items-center gap-2">
          <AvatarUser avatar={post?.author.avatar} username={post?.author.username} />

          <div className="space-y-1">
            <h3>{user?.username}</h3>
            <div className="text-xs  line-clamp-1">
              {formatFullDate(post?.createdAt)} •{" "}
              {t("Date.readingTime", {
                readingTime: calculateReadingTime(post?.content ?? ""),
              })}
            </div>
          </div>
        </div>
      </div>
      <Divider className="my-4" />
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          className={cn(
            "text-xs rounded-full w-[60px] cursor-pointer",
            post?.reaction === ReactionType.LIKE && "text-red-500 hover:text-red-600"
          )}
          onClick={() => {
            createLikeMutation.mutate({
              targetId: postId,
              targetType: LikeTargetType.POST,
              isDislike: false,
            });
          }}
        >
          <ThumbsUp
            className={cn("w-4 h-4", post?.reaction === ReactionType.LIKE && "fill-red-500")}
          />
          <span>{post?.likeCount}</span>
        </Button>
        <Button
          variant="outline"
          className={cn(
            "text-xs rounded-full w-[60px] cursor-pointer",
            post?.reaction === ReactionType.DISLIKE && "text-red-500 hover:text-red-600"
          )}
          onClick={() => {
            createLikeMutation.mutate({
              targetId: postId,
              targetType: LikeTargetType.POST,
              isDislike: true,
            });
          }}
        >
          <ThumbsDown
            className={cn("w-4 h-4", post?.reaction === ReactionType.DISLIKE && "fill-red-500")}
          />
          <span>{post?.dislikeCount}</span>
        </Button>

        <Button
          variant="outline"
          className="rounded-full cursor-pointer"
          onClick={() => {
            document.getElementById("comments-section")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <MessageCircle className="w-4 h-4" />
          <span>{post?.commentCount}</span>
        </Button>
        <Button
          variant="outline"
          className={cn(
            "rounded-full cursor-pointer",
            post?.bookmarkStatus === BookmarkStatus.BOOKMARKED && "text-red-500 hover:text-red-600 "
          )}
          onClick={() => {
            createBookmarkMutation.mutate({
              targetId: postId,
              targetType: BookmarkTargetType.POST,
            });
          }}
        >
          <Bookmark
            className={cn(
              "w-4 h-4",
              post?.bookmarkStatus === BookmarkStatus.BOOKMARKED && "fill-red-500"
            )}
          />
          <span>{post?.bookmarkCount}</span>
        </Button>
        <Button variant="outline" className="rounded-full cursor-pointer">
          <Share className="w-4 h-4" />
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
