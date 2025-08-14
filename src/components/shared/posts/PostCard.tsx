"use client";

import React, { useMemo } from "react";
import { AvatarUser } from "@/components/shared/avatar-user";
import { Post } from "@/types/post.type";
import { Eye, Bookmark, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatFullDate } from "@/lib/date";
import { ROUTE_PATHS } from "@/constants/route-paths";
import Link from "next/link";
import { calculateReadingTime } from "@/lib/reading-time";
import { Series } from "@/types/series.type";
import { getUserDisplayName } from "@/lib/format";
import Image from "next/image";
import { Badge } from "../Badge";

interface PostCardProps {
  post: Post | Series;
  className?: string;
  isSeries?: boolean;
}

export const PostCard = ({ post, className, isSeries }: PostCardProps) => {
  const href = useMemo(
    () => (isSeries ? ROUTE_PATHS.SERIES.DETAIL(post.id) : ROUTE_PATHS.POST.DETAIL(post.id)),
    [isSeries, post.id]
  );

  return (
    <Link href={href} className="block group">
      <article
        className={cn(
          "bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden",
          "transition-all duration-200 hover:shadow-md hover:border-primary/30",
          className
        )}
      >
        {/* Thumbnail Image Section */}
        {post.thumbnail && (
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />

            {/* Reading Time Badge */}
            <div className="absolute top-2 right-2 px-2 py-0.5 bg-black/60 text-white text-xs rounded">
              {calculateReadingTime(post.content)}m
            </div>
          </div>
        )}

        {/* Content Section */}
        <div className="p-4 space-y-3">
          {/* Author Info */}
          <div className="flex items-center gap-2">
            <AvatarUser
              avatar={post.author.avatar}
              username={getUserDisplayName(post.author)}
              className="w-6 h-6"
            />
            <span className="text-sm font-medium text-foreground">
              {getUserDisplayName(post.author)}
            </span>
            <span className="text-xs text-muted-foreground">•</span>
            <time className="text-xs text-muted-foreground">{formatFullDate(post.createdAt)}</time>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
            {post.title}
          </h3>

          {/* Excerpt */}
          {post.content && (
            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {post.content.substring(0, 120)}...
            </p>
          )}

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex items-center gap-1.5 flex-wrap">
              {post.tags.slice(0, 2).map((tag) => (
                <Badge key={tag.id}>{tag.name}</Badge>
              ))}
              {post.tags.length > 2 && (
                <span className="text-xs text-muted-foreground">+{post.tags.length - 2}</span>
              )}
            </div>
          )}

          {/* Stats */}
          <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Eye className="size-3" />
                <span>20</span>
              </div>
              <div className="flex items-center gap-1">
                <Bookmark className="size-3" />
                <span>{post.bookmarkCount}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="size-3" />
                <span>{post.commentCount}</span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};
