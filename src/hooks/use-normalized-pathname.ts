import { useMemo } from "react";
import { usePathname } from "next/navigation";

export function useNormalizedPathname() {
  const pathname = usePathname();

  return useMemo(() => {
    if (!pathname) return "/";
    const match = pathname.match(/^\/(\w{2})(\/|$)/);
    if (match) {
      const pathAfterLocale = pathname.replace(/^\/\w{2}/, "");
      return pathAfterLocale || "/";
    }
    return pathname;
  }, [pathname]);
}
