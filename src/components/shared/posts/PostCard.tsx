"use client";

import React, { useMemo } from "react";
import { AvatarUser } from "@/components/shared/avatar-user";
import { Post } from "@/types/post.type";
import { Eye, Bookmark, MessageCircle, Link as LinkIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatFullDate } from "@/lib/date";
import { ROUTE_PATHS } from "@/constants/route-paths";
import Link from "next/link";
import { calculateReadingTime } from "@/lib/reading-time";
import { useTranslations } from "next-intl";
import { Tooltip, TooltipContent, TooltipTrigger } from "../Tooltip";
import TagBadge from "../tags/TagBadge";
import { Series } from "@/types/series.type";
import { getUserDisplayName } from "@/lib/format";

interface PostCardProps {
  post: Post | Series;
  className?: string;
  isSeries?: boolean;
}

export const PostCard = ({ post, className, isSeries }: PostCardProps) => {
  const t = useTranslations();

  const href = useMemo(
    () => (isSeries ? ROUTE_PATHS.SERIES.DETAIL(post.id) : ROUTE_PATHS.POST.DETAIL(post.id)),
    [isSeries, post.id]
  );

  return (
    <Link href={href} className="block group">
      <div
        className={cn(
          "flex gap-4 py-6 px-4 transition-all duration-200 hover:shadow-sm",
          className
        )}
      >
        {/* Avatar Section */}
        <div className="flex-shrink-0">
          <AvatarUser
            avatar={post.author.avatar}
            username={getUserDisplayName(post.author)}
            className="w-12 h-12 ring-2 ring-transparent group-hover:ring-primary/20 transition-all"
          />
        </div>

        {/* Content Section */}
        <div className="flex-1 space-y-3 min-w-0">
          {/* Author and Meta Info */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="text-foreground font-semibold group-hover:text-primary transition-colors">
              {getUserDisplayName(post.author)}
            </span>
            <span className="text-xs">•</span>
            <span className="text-xs">{formatFullDate(post.createdAt)}</span>
            <span className="text-xs">•</span>
            <span className="text-xs font-medium text-primary">
              {t("Date.readingTime", { readingTime: calculateReadingTime(post.content) })}
            </span>
            {!isSeries && <LinkIcon className="size-3 ml-1 opacity-60" />}
          </div>

          {/* Title and Tags */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-relaxed">
              {post.title}
            </h3>

            {post.tags.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                {post.tags.slice(0, 3).map((tag) => (
                  <TagBadge key={tag.id} className="text-xs hover:bg-primary/10 transition-colors">
                    {tag.name}
                  </TagBadge>
                ))}
                {post.tags.length > 3 && (
                  <span className="text-xs text-muted-foreground font-medium">
                    +{post.tags.length - 3} more
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Excerpt */}
          {post.content && (
            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {post.content.substring(0, 150)}...
            </p>
          )}

          {/* Stats */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6 text-xs text-muted-foreground">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-1.5 hover:text-primary transition-colors cursor-pointer">
                    <Eye className="size-4" />
                    <span className="font-medium">20</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>20 {t("Common.views")}</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-1.5 hover:text-amber-500 transition-colors cursor-pointer">
                    <Bookmark className="size-4" />
                    <span className="font-medium">{post.bookmarkCount}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>
                    {post.bookmarkCount} {t("Common.bookmark")}
                  </p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-1.5 hover:text-blue-500 transition-colors cursor-pointer">
                    <MessageCircle className="size-4" />
                    <span className="font-medium">{post.commentCount}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>
                    {post.commentCount} {t("Common.comments")}
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>

            {/* Reading time badge */}
            <div className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
              {calculateReadingTime(post.content)} min read
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
