import { Tag } from "@/types/tag";
import React from "react";
import TagBadgeSkeleton from "./TagBadgeSkeleton";
import { Badge } from "../Badge";

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
            <Badge key={tag.id}>{tag.name}</Badge>
          ))}
        </>
      )}
    </div>
  );
};

export default ListTags;
