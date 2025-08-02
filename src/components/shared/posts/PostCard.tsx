"use client";

import React from "react";
import { AvatarUser } from "@/components/shared/avatar-user";
import { Badge } from "@/components/shared/Badge";
import { Post } from "@/types/post";
import { Eye, Bookmark, MessageCircle, Link } from "lucide-react";
import { cn } from "@/lib/utils";

interface PostCardProps {
  post: Post;
  className?: string;
}

export const PostCard = ({ post, className }: PostCardProps) => {
  return (
    <div className={cn("flex gap-3 p-2", className)}>
      <AvatarUser avatar={post.author.avatar} username={post.author.username} />

      <div className="space-y-1">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="text-foreground">{post.author.username}</span>
          <span>thg 6 5, 8:00 CH</span>
          <span>2 phút đọc</span>
          <Link className="size-3" />
        </div>

        <div className="">{post.title}</div>

        <div className="flex items-center gap-2">
          {post.tags.map((tag) => (
            <Badge
              key={tag.id}
              variant="secondary"
              className="text-xs text-muted-foreground font-normal"
            >
              {tag.name}
            </Badge>
          ))}
        </div>

        <div className="flex items-center text-muted-foreground">
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1">
              <Eye className="size-3" />
              <span>20</span>
            </div>
            <div className="flex items-center gap-1">
              <Bookmark className="size-3" />
              <span>1</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="size-3" />
              <span>20</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
