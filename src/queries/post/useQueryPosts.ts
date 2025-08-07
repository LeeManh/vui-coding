import { getPosts } from "@/apis/post";
import { QUERY_KEYS } from "@/constants/query-keys";
import { ListPostParams } from "@/types/post.type";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useQueryPosts = (params?: ListPostParams) => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.POSTS.ALL, params],
    queryFn: () => getPosts(params),
    placeholderData: keepPreviousData,
  });

  return { ...query };
};
