import React, { useState } from "react";
import { AvatarUser } from "@/components/shared/avatar-user";
import { Textarea } from "@/components/shared/Textarea";
import { Button } from "@/components/shared/Button";
import { useAuth } from "@/contexts/auth-context";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment } from "@/apis/comment";
import { QUERY_KEYS } from "@/constants/query-keys";

interface CommentFormProps {
  postId: string;
  parentId?: string;
  isReply?: boolean;
  onCancel?: () => void;
}

const CommentForm = ({ postId, parentId, isReply, onCancel }: CommentFormProps) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [content, setContent] = useState("");

  const createCommentMutation = useMutation({
    mutationFn: createComment,
  });

  const handleSubmit = async () => {
    if (!content.trim()) return;

    await createCommentMutation.mutateAsync({ postId, parentId, content });
    await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.POSTS.COMMENTS, postId] });

    // Reset form after successful submission
    handleCancel();
  };

  const handleCancel = () => {
    setContent("");
    if (onCancel) onCancel();
  };

  return (
    <div className="flex gap-3">
      <AvatarUser avatar={user?.avatar} username={user?.username} />

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
