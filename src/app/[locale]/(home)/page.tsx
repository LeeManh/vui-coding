"use client";

import { PostCard } from "@/components/shared/posts/PostCard";
import { dummyPosts } from "@/dummy";
import { TitleSection } from "@/components/shared/title-section";
import { CustomPagination } from "@/components/shared/custom-pagination";

export default function Home() {
  return (
    <div className="flex gap-2 pt-6">
      <div className="divide-y flex-1">
        {dummyPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}

        <CustomPagination
          currentPage={1}
          totalPages={10}
          onPageChange={() => {}}
          className="mt-4"
        />
      </div>

      <div className="w-64 h-fit">
        <div className="p-2">
          <TitleSection title="Series mới nhất" />
        </div>
      </div>
    </div>
  );
}
