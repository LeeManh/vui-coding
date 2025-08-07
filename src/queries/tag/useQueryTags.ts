import { getTags } from "@/apis/tag";
import { QUERY_KEYS } from "@/constants/query-keys";
import { useQuery } from "@tanstack/react-query";

export default function useQueryTags() {
  const query = useQuery({
    queryKey: [QUERY_KEYS.TAGS.ALL],
    queryFn: () => getTags(),
  });

  return { ...query };
}
