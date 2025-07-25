import { ROUTE_PATHS } from "@/constants/route-paths.constant";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getPostUrl(postId: string) {
  return `${ROUTE_PATHS.POST.ROOT}/${postId}`;
}
