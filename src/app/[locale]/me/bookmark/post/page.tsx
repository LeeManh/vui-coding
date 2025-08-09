import { useTranslations } from "next-intl";
import React from "react";
import { Button } from "@/components/shared/Button";
import { Input } from "@/components/shared/Input";
import { Search, Bookmark, Filter, SortDesc } from "lucide-react";
import DateRangePicker from "@/components/shared/date-picker/date-range-picker";
import { PostCard } from "@/components/shared/posts/PostCard";
import { dummyPosts } from "@/dummy";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/Card";

const BookMarkPostPage = () => {
  const t = useTranslations();

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground flex items-center justify-center gap-3">
          <Bookmark className="w-8 h-8 text-primary" />
          {t("Profile.bookmarkPost")}
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          {t("Profile.bookmarkPostDescription")}
        </p>
      </div>

      {/* Statistics Card */}
      <Card className="border-2 border-blue-200 bg-blue-50/50 dark:bg-blue-900/10 dark:border-blue-800">
        <CardHeader className="text-center">
          <CardTitle className="text-blue-800 dark:text-blue-400 flex items-center justify-center gap-2">
            <Bookmark className="w-5 h-5" />
            Tổng số bài viết đã bookmark
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="text-4xl font-bold text-blue-900 dark:text-blue-300">
            {dummyPosts.length}
          </div>
          <p className="text-sm text-blue-700 dark:text-blue-400 mt-2">
            Bài viết đã lưu để đọc sau
          </p>
        </CardContent>
      </Card>

      {/* Filter Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Bộ lọc và tìm kiếm
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <DateRangePicker />

            <Input placeholder="Lọc theo thẻ" className="w-full md:w-54" />

            <div className="flex items-center gap-2 w-full md:ml-auto md:w-auto">
              <Input placeholder="Tìm kiếm bài viết..." className="w-full md:w-64" />
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

      {/* Bookmark Posts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bookmark className="w-5 h-5" />
            Danh sách bài viết đã bookmark
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {dummyPosts.map((post) => (
              <div key={post.id} className="hover:bg-muted/50 transition-colors">
                <PostCard post={post} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookMarkPostPage;
