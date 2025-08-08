"use client";

import React, { useState } from "react";
import { Button } from "@/components/shared/Button";
import { AvatarUser } from "@/components/shared/avatar-user";
import { MessageCircle, ThumbsDown, ThumbsUp } from "lucide-react";
import { Comment } from "@/types/comment.type";
import { cn } from "@/lib/utils";
import { getTimeAgo } from "@/lib/date";
import CommentForm from "./CommentForm";
import { ReactionType } from "@/constants/reaction";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLike } from "@/apis/like";
import { QUERY_KEYS } from "@/constants/query-keys";
import { LikeTargetType } from "@/constants/like";
import { useLocale, useTranslations } from "next-intl";
import _ from "lodash";

interface CommentItemProps {
  comment: Comment;
  isReply?: boolean;
  isSeries?: boolean;
}

const CommentItem = ({ comment, isReply, isSeries }: CommentItemProps) => {
  const t = useTranslations();
  const queryClient = useQueryClient();
  const locale = useLocale();

  const likeTargetType = LikeTargetType.COMMENT;

  const [showReplyForm, setShowReplyForm] = useState(false);

  const createLikeMutation = useMutation({
    mutationFn: createLike,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.POSTS.COMMENTS, comment.targetId] });
    },
  });

  return (
    <div className={cn("space-y-4 relative", isReply && "ml-12")}>
      <div className="absolute left-4 top-10 bottom-0 w-[0.5px] h-[calc(100%-30px)] bg-gray-400" />

      <div className="flex gap-3">
        <AvatarUser avatar={comment.user.avatar} username={comment.user.username} />

        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm">{comment.user.username}</span>
            <span className="text-xs text-muted-foreground">
              {getTimeAgo(comment.createdAt, locale)}
            </span>
          </div>

          <div className="text-sm text-foreground">{comment.content}</div>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              className={cn(
                "text-xs",
                comment.reaction === ReactionType.LIKE && "text-red-500 hover:text-red-600"
              )}
              onClick={() => {
                createLikeMutation.mutate({
                  targetId: comment.id,
                  targetType: likeTargetType,
                });
              }}
            >
              <ThumbsUp
                className={cn("w-4 h-4", comment.reaction === ReactionType.LIKE && "fill-red-500")}
              />
              <span>
                {t("Common.like")} ({comment.likeCount})
              </span>
            </Button>

            <Button
              variant="ghost"
              className={cn(
                "text-xs",
                comment.reaction === ReactionType.DISLIKE && "text-red-500 hover:text-red-600"
              )}
              onClick={() => {
                createLikeMutation.mutate({
                  targetId: comment.id,
                  targetType: likeTargetType,
                  isDislike: true,
                });
              }}
            >
              <ThumbsDown
                className={cn(
                  "w-4 h-4",
                  comment.reaction === ReactionType.DISLIKE && "fill-red-500"
                )}
              />
              <span>
                {t("Common.dislike")} ({comment.dislikeCount})
              </span>
            </Button>

            <Button
              variant="ghost"
              className="text-xs"
              onClick={() => {
                setShowReplyForm((pre) => !pre);
              }}
            >
              <MessageCircle className="w-4 h-4" />
              <span>
                {_.capitalize(t("Common.reply"))} ({comment.commentCount})
              </span>
            </Button>
          </div>

          {showReplyForm && (
            <CommentForm
              targetId={comment.targetId}
              parentId={comment.id}
              isReply
              onCancel={() => setShowReplyForm(false)}
              isSeries={isSeries}
            />
          )}
        </div>
      </div>

      {/* Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="space-y-6">
          {comment.replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} isReply />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentItem;
