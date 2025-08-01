import React from "react";
import { Button } from "@/components/shared/Button";
import { Heart, MessageCircle, Share } from "lucide-react";
import { cn } from "@/lib/utils";

interface PostCardActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  likesCount: number;
  commentsCount: number;
}

export const PostCardActions = ({
  likesCount,
  commentsCount,
  className,
  ...rest
}: PostCardActionsProps) => {
  return (
    <div
      className={cn(
        "flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300",
        className
      )}
      {...rest}
    >
      <Button variant="ghost" className=" text-xs">
        <Heart />
        <span>{likesCount}</span>
      </Button>
      <Button variant="ghost" className="">
        <MessageCircle />
        <span>{commentsCount}</span>
      </Button>
      <Button variant="ghost" className="">
        <Share />
      </Button>
    </div>
  );
};
