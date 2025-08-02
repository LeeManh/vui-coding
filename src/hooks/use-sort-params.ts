import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useMemo } from "react";
import { SortType } from "@/constants/filter";

interface Props {
  defaultSort?: SortType;
  paramName?: string;
}

export const useSortParams = ({ defaultSort = SortType.NEW, paramName = "sort" }: Props = {}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const isValidSort = (sort: string): sort is SortType => {
    return Object.values(SortType).includes(sort as SortType);
  };

  const sort = useMemo(() => {
    const sortValue = searchParams.get(paramName);
    if (sortValue && isValidSort(sortValue)) return sortValue;
    return defaultSort;
  }, [searchParams, paramName, defaultSort]);

  const updateSort = (newSort: SortType) => {
    const params = new URLSearchParams(searchParams);
    params.set(paramName, newSort);
    router.push(`${pathname}?${params.toString()}`);
  };

  return { sort, updateSort };
};
