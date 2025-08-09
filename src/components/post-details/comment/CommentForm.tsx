import React, { useState } from "react";
import { AvatarUser } from "@/components/shared/avatar-user";
import { Textarea } from "@/components/shared/Textarea";
import { Button } from "@/components/shared/Button";
import { useAuth } from "@/contexts/auth-context";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment } from "@/apis/comment.api";
import { QUERY_KEYS } from "@/constants/query-keys";
import { CommentTargetType } from "@/constants/comment.constant";
import { getUserDisplayName } from "@/lib/format";

interface CommentFormProps {
  targetId: string;
  parentId?: string;
  isReply?: boolean;
  isSeries?: boolean;
  onCancel?: () => void;
}

const CommentForm = ({ targetId, parentId, isReply, onCancel, isSeries }: CommentFormProps) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [content, setContent] = useState("");

  console.log("targetId", targetId);

  const createCommentMutation = useMutation({
    mutationFn: createComment,
  });

  const handleSubmit = async () => {
    if (!content.trim()) return;

    await createCommentMutation.mutateAsync({
      targetId: targetId,
      targetType: isSeries ? CommentTargetType.SERIES : CommentTargetType.POST,
      content,
      parentId: isReply ? parentId! : undefined,
    });

    await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.POSTS.COMMENTS, targetId] });

    if (isSeries) {
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.SERIES.DETAIL, targetId] });
    } else {
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.POSTS.DETAIL, targetId] });
    }

    // Reset form after successful submission
    handleCancel();
  };

  const handleCancel = () => {
    setContent("");
    if (onCancel) onCancel();
  };

  return (
    <div className="flex gap-3">
      <AvatarUser avatar={user?.avatar} username={getUserDisplayName(user)} />

      <div className="flex-1 space-y-3">
        <Textarea
          placeholder={isReply ? "Write a reply..." : "Write a comment..."}
          className="min-h-20 resize-none"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          {(isReply || content) && (
            <Button variant="outline" onClick={handleCancel} className="w-[100px]">
              Cancel
            </Button>
          )}
          <Button
            onClick={handleSubmit}
            disabled={!content.trim() || createCommentMutation.isPending}
            className="w-[100px]"
          >
            {isReply ? "Reply" : "Post"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommentForm;
