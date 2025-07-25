import { Post } from "@/types/post.type";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import PostCardActions from "./PostCardActions";
import { Skeleton } from "@/components/ui/Skeleton";
import { getPostUrl } from "@/lib/utils";

interface PostCardFeaturedProps {
  post: Post;
}

const PostCardFeatured = ({ post }: PostCardFeaturedProps) => {
  return (
    <Link href={getPostUrl(post.id)} className="block group">
      <article className="flex items-center gap-4">
        <Image src={post.thumbnail} alt={post.title} width={420} height={280} />

        <div className="text-center w-1/2 mx-auto space-y-3">
          <div className=" text-3xl line-clamp-3">{post.title}</div>
          <div className="text-sm leading-5 line-clamp-3">{post.subTitle}</div>
          <div className="text-xs  line-clamp-1">
            {dayjs(post.createdAt).format("MMM DD")} • {post.author.username}
          </div>

          <PostCardActions
            likesCount={post.likesCount}
            commentsCount={post.commentsCount}
            className="justify-center gap-2"
          />
        </div>
      </article>
    </Link>
  );
};

export const PostCardFeaturedSkeleton = () => {
  return (
    <div className="block group">
      <article className="flex items-center gap-4">
        {/* Image Skeleton */}
        <Skeleton className="w-[420px] h-[280px] rounded-lg" />

        {/* Content Skeleton */}
        <div className="text-center w-1/2 mx-auto space-y-3">
          {/* Title Skeleton - 3 lines */}
          <div className="space-y-2">
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-full" />
          </div>

          {/* Subtitle Skeleton - 3 lines */}
          <div className="space-y-1.5">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 mx-auto" />
          </div>
        </div>
      </article>
    </div>
  );
};

export default PostCardFeatured;
