import { useTranslations } from "next-intl";
import React from "react";
import { Button } from "@/components/shared/Button";
import { Input } from "@/components/shared/Input";
import { Search } from "lucide-react";
import DateRangePicker from "@/components/shared/date-picker/date-range-picker";
import { dummyPosts } from "@/dummy";
import { PostCard } from "@/components/shared/posts/PostCard";

const BookMarkSeriesPage = () => {
  const t = useTranslations();

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <div className="text-subheading">{t("Profile.bookmarkSeries")}</div>
        <div className="text-caption">{t("Profile.bookmarkSeriesDescription")}</div>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-4">
        <DateRangePicker />

        <Input placeholder="Thẻ" className="w-54" />

        <div className="flex items-center gap-2 ml-auto">
          <Input placeholder="Tìm kiếm" className="w-64" />
          <Button variant="outline" size="sm">
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Bookmark List */}
      <div className="divide-y">
        {dummyPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default BookMarkSeriesPage;
