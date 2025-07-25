"use client";

import Link from "next/link";
import { Post } from "@/types/post.type";
import Image from "next/image";
import React from "react";
import { Skeleton } from "../Skeleton";
import { getPostUrl } from "@/lib/utils";

interface PostSearchItemProps {
  post: Post;
}

const PostSearchItem = ({ post }: PostSearchItemProps) => {
  return (
    <Link href={getPostUrl(post.id)}>
      <div className="flex items-center gap-4 cursor-pointer hover:bg-accent p-2 rounded-md">
        <Image
          src={post.thumbnail}
          alt={post.title}
          width={40}
          height={40}
          className="rounded-md object-cover w-10 h-10"
        />

        <div className="">
          <div className="font-medium line-clamp-1">{post.title}</div>

          <div className="line-clamp-1 text-gray-500">{post.subTitle}</div>
        </div>
      </div>
    </Link>
  );
};

export const PostSearchItemSkeleton = () => {
  return (
    <div className="flex items-center gap-4 cursor-pointer hover:bg-accent p-2 rounded-md">
      <Skeleton className="w-10 h-10 rounded-md " />
      <div className="flex-1 space-y-1">
        <Skeleton className="w-full h-4 rounded-md " />
        <Skeleton className="w-full h-3 rounded-md " />
      </div>
    </div>
  );
};

export default PostSearchItem;
