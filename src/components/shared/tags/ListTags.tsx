import { Tag } from "@/types/tag";
import React from "react";
import TagBadgeSkeleton from "./TagBadgeSkeleton";
import TagBadge from "./TagBadge";

interface ListTagsProps {
  tags?: Tag[];
  isLoading?: boolean;
  numberSkeleton?: number;
}

const ListTags = ({ tags, isLoading, numberSkeleton = 5 }: ListTagsProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {isLoading ? (
        <>
          {Array.from({ length: numberSkeleton }, (_, i) => (
            <TagBadgeSkeleton key={i} />
          ))}
        </>
      ) : (
        <>
          {tags?.map((tag) => (
            <TagBadge key={tag.id}>{tag.name}</TagBadge>
          ))}
        </>
      )}
    </div>
  );
};

export default ListTags;
