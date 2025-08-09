import { useTranslations } from "next-intl";
import React from "react";
import { Button } from "@/components/shared/Button";
import { Input } from "@/components/shared/Input";
import { Search, Bookmark, Filter, SortDesc, BookOpen, List } from "lucide-react";
import DateRangePicker from "@/components/shared/date-picker/date-range-picker";
import { dummyPosts } from "@/dummy";
import { PostCard } from "@/components/shared/posts/PostCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/Card";

const BookMarkSeriesPage = () => {
  const t = useTranslations();

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground flex items-center justify-center gap-3">
          <BookOpen className="w-8 h-8 text-primary" />
          {t("Profile.bookmarkSeries")}
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          {t("Profile.bookmarkSeriesDescription")}
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-2 border-purple-200 bg-purple-50/50 dark:bg-purple-900/10 dark:border-purple-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-800 dark:text-purple-400">
              Tổng series đã bookmark
            </CardTitle>
            <BookOpen className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900 dark:text-purple-300">
              {dummyPosts.length}
            </div>
            <p className="text-xs text-purple-700 dark:text-purple-400">
              Series đã lưu để theo dõi
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 border-green-200 bg-green-50/50 dark:bg-green-900/10 dark:border-green-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800 dark:text-green-400">
              Tổng bài viết trong series
            </CardTitle>
            <List className="h-5 w-5 text-green-600 dark:text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900 dark:text-green-300">156</div>
            <p className="text-xs text-green-700 dark:text-green-400">
              Bài viết có thể đọc từ series
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filter Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Bộ lọc và tìm kiếm series
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <DateRangePicker />

            <Input placeholder="Lọc theo thẻ series" className="w-full md:w-54" />

            <div className="flex items-center gap-2 w-full md:ml-auto md:w-auto">
              <Input placeholder="Tìm kiếm series..." className="w-full md:w-64" />
              <Button variant="outline" size="sm">
                <Search className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <SortDesc className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bookmark Series List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bookmark className="w-5 h-5" />
            Danh sách series đã bookmark
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {dummyPosts.map((post) => (
              <div key={post.id} className="hover:bg-muted/50 transition-colors">
                <PostCard post={post} isSeries={true} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookMarkSeriesPage;
