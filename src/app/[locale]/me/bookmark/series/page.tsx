import { useTranslations } from "next-intl";
import React from "react";
import { Button } from "@/components/shared/Button";
import { Input } from "@/components/shared/Input";
import { Search, Bookmark, Filter, SortDesc, BookOpen, List } from "lucide-react";
import DateRangePicker from "@/components/shared/date-picker/date-range-picker";
import { dummyPosts } from "@/dummy";
import { PostCard } from "@/components/shared/posts/PostCard";
import { Card } from "@/components/shared/Card";

const BookMarkSeriesPage = () => {
  const t = useTranslations();

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {/* Header - Minimal */}
      <div className="mb-6">
        <h1 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <BookOpen className="w-4 h-4" />
          {t("Profile.bookmarkSeries")}
        </h1>
        <p className="text-sm text-muted-foreground">{t("Profile.bookmarkSeriesDescription")}</p>
      </div>

      {/* Statistics - Compact Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Card className="p-3 border border-purple-200 dark:border-purple-800 bg-purple-50/30 dark:bg-purple-900/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-purple-700 dark:text-purple-400">Series bookmark</p>
              <p className="text-lg font-semibold text-purple-900 dark:text-purple-300">
                {dummyPosts.length}
              </p>
            </div>
            <BookOpen className="h-4 w-4 text-purple-600 dark:text-purple-400" />
          </div>
          <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">Series đã lưu</p>
        </Card>

        <Card className="p-3 border border-green-200 dark:border-green-800 bg-green-50/30 dark:bg-green-900/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-green-700 dark:text-green-400">Tổng bài viết</p>
              <p className="text-lg font-semibold text-green-900 dark:text-green-300">156</p>
            </div>
            <List className="h-4 w-4 text-green-600 dark:text-green-400" />
          </div>
          <p className="text-xs text-green-600 dark:text-green-400 mt-1">Trong series</p>
        </Card>
      </div>

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
            <Input placeholder="Tìm kiếm series..." className="w-full sm:w-48 h-9 text-sm" />
            <Button variant="outline" size="sm" className="h-9 px-3">
              <Search className="h-3.5 w-3.5" />
            </Button>
            <Button variant="outline" size="sm" className="h-9 px-3">
              <SortDesc className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Bookmark Series - Clean List */}
      <Card className="p-4">
        <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
          <Bookmark className="w-4 h-4" />
          Series bookmark ({dummyPosts.length})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {dummyPosts.map((post) => (
            <PostCard post={post} isSeries={true} key={post.id} />
          ))}
        </div>
      </Card>
    </div>
  );
};

export default BookMarkSeriesPage;
