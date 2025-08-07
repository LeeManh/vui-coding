"use client";

import React from "react";
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

interface PostCardProps {
  post: Post;
  className?: string;
}

export const PostCard = ({ post, className }: PostCardProps) => {
  const t = useTranslations();

  return (
    <Link href={ROUTE_PATHS.POST.DETAIL(post.id)} className="block">
      <div className={cn("flex gap-3 py-4 px-2", className)}>
        <AvatarUser avatar={post.author.avatar} username={post.author.username} />

        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="text-foreground font-medium">{post.author.username}</span>
            <span>{formatFullDate(post.createdAt)}</span>
            <span>
              {t("Date.readingTime", { readingTime: calculateReadingTime(post.content) })}
            </span>
            <LinkIcon className="size-3" />
          </div>

          <div className="flex items-center gap-x-2 gap-y-1 flex-wrap">
            <div className="">{post.title}</div>
            {post.tags.map((tag) => (
              <TagBadge key={tag.id}>{tag.name}</TagBadge>
            ))}
          </div>

          <div className="flex items-center text-muted-foreground">
            <div className="flex items-center gap-4 text-xs">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-1">
                    <Eye className="size-3" />
                    <span>20</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>20 {t("Common.views")}</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-1">
                    <Bookmark className="size-3" />
                    <span>{post.bookmarkCount}</span>
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
                  <div className="flex items-center gap-1">
                    <MessageCircle className="size-3" />
                    <span>{post.commentCount}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>
                    {post.commentCount} {t("Common.comments")}
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
