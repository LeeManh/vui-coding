import React from "react";
import { Skeleton } from "../Skeleton";

export const PostCardSkeleton = () => {
  return (
    <div className="flex items-center space-x-4 py-4 px-2">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2 flex-1">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  );
};
