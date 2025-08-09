import React from "react";
import { Skeleton } from "../Skeleton";

export const PostCardSkeleton = () => {
  return (
    <article className="bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
      {/* Thumbnail Image Skeleton */}
      <div className="relative h-48 w-full">
        <Skeleton className="w-full h-full" />
        {/* Reading Time Badge Skeleton */}
        <div className="absolute top-2 right-2">
          <Skeleton className="h-5 w-8 rounded" />
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-3">
        {/* Author Info Skeleton */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-3 w-1 rounded-full" />
          <Skeleton className="h-3 w-16" />
        </div>

        {/* Title Skeleton */}
        <div className="space-y-1">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-4/5" />
        </div>

        {/* Excerpt Skeleton */}
        <div className="space-y-1">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>

        {/* Tags Skeleton */}
        <div className="flex items-center gap-1.5">
          <Skeleton className="h-5 w-12 rounded" />
          <Skeleton className="h-5 w-16 rounded" />
          <Skeleton className="h-3 w-4" />
        </div>

        {/* Stats Skeleton */}
        <div className="flex items-center gap-3 pt-2 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-1">
            <Skeleton className="h-3 w-3" />
            <Skeleton className="h-3 w-4" />
          </div>
          <div className="flex items-center gap-1">
            <Skeleton className="h-3 w-3" />
            <Skeleton className="h-3 w-4" />
          </div>
          <div className="flex items-center gap-1">
            <Skeleton className="h-3 w-3" />
            <Skeleton className="h-3 w-4" />
          </div>
        </div>
      </div>
    </article>
  );
};
