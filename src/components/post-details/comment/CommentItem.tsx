"use client";

import React, { useState } from "react";
import { Button } from "@/components/shared/Button";
import { AvatarUser } from "@/components/shared/avatar-user";
import { Heart, MessageCircle } from "lucide-react";
import { Comment } from "@/types/comment";
import { cn } from "@/lib/utils";
import { getTimeAgo } from "@/lib/date";
import CommentForm from "./CommentForm";
import { ReactionTarget } from "@/types/reaction";
import { useOptimisticCommentLike } from "@/hooks/use-optimistic-comment-like";

interface CommentItemProps {
  comment: Comment;
  isReply?: boolean;
}

const CommentItem = ({ comment, isReply }: CommentItemProps) => {
  const timeAgo = getTimeAgo(comment.createdAt);
  const [showReplyForm, setShowReplyForm] = useState(false);

  const toggleLikeMutation = useOptimisticCommentLike(comment.postId);

  const handleToggleLike = () => {
    toggleLikeMutation.mutate({
      targetId: comment.id,
      targetType: ReactionTarget.COMMENT,
    });
  };

  return (
    <div className={cn("space-y-4 relative", isReply && "ml-12")}>
      <div className="absolute left-4 top-10 bottom-0 w-[1px] h-[calc(100%-30px)] " />

      <div className="flex gap-3">
        <AvatarUser avatar={comment.user.avatar} username={comment.user.username} />

        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm">{comment.user.username}</span>
            <span className="text-xs ">{timeAgo}</span>
          </div>

          <div className="text-sm text-foreground">{comment.content}</div>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              className={cn("text-xs", comment.isLiked && "text-red-500 hover:text-red-600")}
              onClick={handleToggleLike}
            >
              <Heart className={cn("w-4 h-4", comment.isLiked && "fill-red-500")} />
              <span>LIKE ({comment.likesCount})</span>
            </Button>

            <Button
              variant="ghost"
              className="text-xs"
              onClick={() => {
                setShowReplyForm((pre) => !pre);
              }}
            >
              <MessageCircle className="w-4 h-4" />
              <span>REPLY ({comment.commentsCount})</span>
            </Button>
          </div>

          {showReplyForm && (
            <CommentForm
              postId={comment.postId}
              parentId={comment.id}
              isReply
              onCancel={() => setShowReplyForm(false)}
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
