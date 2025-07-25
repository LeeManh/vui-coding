import { Post } from "@/types/post.type";
import Image from "next/image";
import React from "react";
import dayjs from "dayjs";
import Link from "next/link";
import PostCardActions from "./PostCardActions";
import { Skeleton } from "@/components/ui/Skeleton";
import { getPostUrl } from "@/lib/utils";

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  return (
    <Link href={getPostUrl(post.id)} className="block group">
      <article className="flex py-4 gap-4">
        <div className="space-y-2 flex-1">
          <div className="text-lg line-clamp-3">{post.title}</div>
          <div className="text-sm leading-5 line-clamp-3">{post.subTitle}</div>
          <div className="text-xs  line-clamp-1">
            {dayjs(post.createdAt).format("MMM DD")} • {post.author.username}
          </div>
          <PostCardActions likesCount={post.likesCount} commentsCount={post.commentsCount} />
        </div>

        <div>
          <Image
            src={post.thumbnail}
            alt={post.title}
            width={160}
            height={106}
            className="rounded-sm w-[160px] h-[106px] object-cover"
          />
        </div>
      </article>
    </Link>
  );
};

export const PostCardSkeleton = () => {
  return (
    <div className="block group">
      <article className="flex py-4 gap-4">
        {/* Left side - Content */}
        <div className="space-y-2 flex-1">
          {/* Title skeleton - 3 lines (text-lg = h-7) */}
          <div className="space-y-1">
            <Skeleton className="h-7 w-full" />
            <Skeleton className="h-7 w-5/6" />
            <Skeleton className="h-7 w-2/3" />
          </div>
        </div>

        {/* Right side - Thumbnail */}
        <div>
          <Skeleton className="w-40 h-[106px] rounded-sm" />
        </div>
      </article>
    </div>
  );
};

export default PostCard;
