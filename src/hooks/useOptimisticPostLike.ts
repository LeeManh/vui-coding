import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleReaction } from "@/apis/reaction.api";
import { QUERY_KEYS } from "@/constants/query-keys.constant";
import { Post } from "@/types/post.type";

export const useOptimisticPostLike = (postId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleReaction,
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEYS.POSTS.DETAIL, postId],
      });

      const previousPost = queryClient.getQueryData([QUERY_KEYS.POSTS.DETAIL, postId]);

      queryClient.setQueryData(
        [QUERY_KEYS.POSTS.DETAIL, postId],
        (old: { data: Post } | undefined) => {
          if (!old?.data) return old;

          return {
            ...old,
            data: {
              ...old.data,
              isLiked: !old.data.isLiked,
              likesCount: old.data.isLiked ? old.data.likesCount - 1 : old.data.likesCount + 1,
            },
          };
        }
      );

      return { previousPost };
    },
    onError: (err, variables, context) => {
      if (context?.previousPost) {
        queryClient.setQueryData([QUERY_KEYS.POSTS.DETAIL, postId], context.previousPost);
      }
    },
    onSettled: (data, error) => {
      // Chỉ refetch khi có lỗi
      if (error) {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.POSTS.DETAIL, postId],
        });
      }
    },
  });
};
