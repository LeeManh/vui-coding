import { getListSeries } from "@/apis/series.api";
import { QUERY_KEYS } from "@/constants/query-keys";
import { useQuery } from "@tanstack/react-query";

export default function useQuerySeries() {
  const query = useQuery({
    queryKey: [QUERY_KEYS.SERIES.LIST],
    queryFn: () => getListSeries(),
  });

  return { ...query };
}
