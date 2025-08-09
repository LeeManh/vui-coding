import { useTranslations } from "next-intl";
import React from "react";
import { Button } from "@/components/shared/Button";
import { Input } from "@/components/shared/Input";
import { Search, Bookmark, Filter, SortDesc } from "lucide-react";
import DateRangePicker from "@/components/shared/date-picker/date-range-picker";
import { PostCard } from "@/components/shared/posts/PostCard";
import { dummyPosts } from "@/dummy";
import { Card } from "@/components/shared/Card";

const BookMarkPostPage = () => {
  const t = useTranslations();

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {/* Header - Minimal */}
      <div className="mb-6">
        <h1 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Bookmark className="w-4 h-4" />
          {t("Profile.bookmarkPost")}
        </h1>
        <p className="text-sm text-muted-foreground">{t("Profile.bookmarkPostDescription")}</p>
      </div>

      {/* Statistics - Compact */}
      <Card className="p-4 border border-blue-200 dark:border-blue-800 bg-blue-50/30 dark:bg-blue-900/10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-blue-700 dark:text-blue-400">Tổng bookmark</p>
            <p className="text-2xl font-bold text-blue-900 dark:text-blue-300">
              {dummyPosts.length}
            </p>
          </div>
          <Bookmark className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
        <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">Bài viết đã lưu</p>
      </Card>

      {/* Filter Section - Simplified */}
      <Card className="p-4">
        <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Bộ lọc
        </h3>
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <DateRangePicker />
          <Input placeholder="Lọc theo thẻ" className="w-full sm:w-48 h-9 text-sm" />
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Input placeholder="Tìm kiếm..." className="w-full sm:w-48 h-9 text-sm" />
            <Button variant="outline" size="sm" className="h-9 px-3">
              <Search className="h-3.5 w-3.5" />
            </Button>
            <Button variant="outline" size="sm" className="h-9 px-3">
              <SortDesc className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Bookmark Posts - Clean List */}
      <Card className="p-4">
        <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
          <Bookmark className="w-4 h-4" />
          Danh sách bookmark ({dummyPosts.length})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {dummyPosts.map((post) => (
            <PostCard post={post} key={post.id} />
          ))}
        </div>
      </Card>
    </div>
  );
};

export default BookMarkPostPage;
