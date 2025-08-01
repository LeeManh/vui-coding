import React from "react";
import { Post } from "@/types/post";
import Link, { LinkProps } from "next/link";
import Image from "next/image";
import dayjs from "dayjs";
import { PostCardActions } from "@/components/shared/posts";
import { cn, getPostUrl } from "@/lib/utils";
import { Skeleton } from "@/components/shared/Skeleton";

interface PostCardPopularProps extends Omit<LinkProps, "href"> {
  post: Post;
  className?: string;
}

export const PostCardPopular = ({ post, className, ...rest }: PostCardPopularProps) => {
  return (
    <Link href={getPostUrl(post.id)} className={cn("block group w-full", className)} {...rest}>
      <article>
        <div className="flex gap-2">
          <div className="space-y-2 flex-1">
            <div className=" line-clamp-2">{post.title}</div>
            <div className="text-xs  line-clamp-1">
              {dayjs(post.createdAt).format("MMM DD")} • {post.author.username}
            </div>
          </div>

          <div>
            <Image
              src={post.thumbnail}
              alt={post.title}
              width={64}
              height={64}
              className="rounded-sm object-cover w-[64px] h-[64px]"
            />
          </div>
        </div>

        <PostCardActions
          likesCount={post.likesCount}
          commentsCount={post.commentsCount}
          className="mt-2"
        />
      </article>
    </Link>
  );
};

export const PostCardPopularSkeleton = ({ className }: { className?: string }) => {
  return (
    <div className={cn("block group w-full", className)}>
      <article>
        <div className="flex gap-2">
          {/* Left side - Title and metadata */}
          <div className="space-y-2 flex-1">
            {/* Title skeleton - 2 lines */}
            <div className="space-y-1">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-3/4" />
            </div>

            {/* Date & Author skeleton */}
            <Skeleton className="h-3 w-24" />
          </div>

          {/* Right side - Thumbnail */}
          <div>
            <Skeleton className="w-16 h-16 rounded-sm" />
          </div>
        </div>
      </article>
    </div>
  );
};
