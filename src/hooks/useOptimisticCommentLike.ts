import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleReaction } from "@/apis/reaction.api";
import { QUERY_KEYS } from "@/constants/query-keys.constant";
import { Comment } from "@/types/comment.type";

export const useOptimisticCommentLike = (postId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleReaction,
    onMutate: async (variables) => {
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEYS.POSTS.COMMENTS, postId],
      });

      const previousComments = queryClient.getQueryData([QUERY_KEYS.POSTS.COMMENTS, postId]);

      queryClient.setQueryData(
        [QUERY_KEYS.POSTS.COMMENTS, postId],
        (old: { data: Comment[] } | undefined) => {
          if (!old?.data) return old;

          const updateCommentLikes = (comments: Comment[]): Comment[] => {
            return comments.map((c) => {
              if (c.id === variables.targetId) {
                return {
                  ...c,
                  isLiked: !c.isLiked,
                  likesCount: c.isLiked ? c.likesCount - 1 : c.likesCount + 1,
                };
              }
              if (c.replies && c.replies.length > 0) {
                return {
                  ...c,
                  replies: updateCommentLikes(c.replies),
                };
              }
              return c;
            });
          };

          return {
            ...old,
            data: updateCommentLikes(old.data),
          };
        }
      );

      return { previousComments };
    },
    onError: (err, variables, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData([QUERY_KEYS.POSTS.COMMENTS, postId], context.previousComments);
      }
    },
    onSettled: (data, error) => {
      // Chỉ refetch khi có lỗi
      if (error) {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.POSTS.COMMENTS, postId],
        });
      }
    },
  });
};
