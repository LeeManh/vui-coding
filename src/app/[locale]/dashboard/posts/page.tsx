"use client";

import React, { useState } from "react";
import {
  FileText,
  Plus,
  Search,
  Filter,
  Eye,
  Heart,
  MessageCircle,
  Edit,
  Trash2,
  MoreHorizontal,
  Calendar,
  TrendingUp,
  SortDesc,
  Grid,
  List,
  Settings,
} from "lucide-react";
import { Card } from "@/components/shared/Card";
import { Button } from "@/components/shared/Button";
import { Input } from "@/components/shared/Input";
import { Badge } from "@/components/shared/Badge";
import { dummyPosts } from "@/dummy";

const AllPostsPage = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data for posts with additional metadata
  const postsWithMeta = dummyPosts.map((post, index) => ({
    ...post,
    status: index % 3 === 0 ? "published" : index % 3 === 1 ? "draft" : "scheduled",
    views: Math.floor(Math.random() * 5000) + 100,
    likes: Math.floor(Math.random() * 500) + 10,
    comments: Math.floor(Math.random() * 100) + 5,
    bookmarks: Math.floor(Math.random() * 200) + 5,
  }));

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">
            Đã xuất bản
          </Badge>
        );
      case "draft":
        return (
          <Badge className="bg-gray-100 text-gray-800 border-gray-200 text-xs">Bản nháp</Badge>
        );
      case "scheduled":
        return (
          <Badge className="bg-blue-100 text-blue-800 border-blue-200 text-xs">Đã lên lịch</Badge>
        );
      default:
        return <Badge className="text-xs">Unknown</Badge>;
    }
  };

  const filteredPosts = postsWithMeta.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Header - Minimal */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-lg font-semibold flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Tất cả bài viết
          </h1>
          <p className="text-sm text-muted-foreground">Quản lý toàn bộ bài viết của bạn</p>
        </div>
        <Button size="sm" className="h-8 px-3">
          <Plus className="w-3 h-3 mr-1" />
          Tạo bài viết mới
        </Button>
      </div>

      {/* Statistics - Compact Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Card className="p-3 border border-blue-200 dark:border-blue-800 bg-blue-50/30 dark:bg-blue-900/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-blue-700 dark:text-blue-400">Tổng bài viết</p>
              <p className="text-lg font-semibold text-blue-900 dark:text-blue-300">
                {postsWithMeta.length}
              </p>
            </div>
            <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </div>
        </Card>

        <Card className="p-3 border border-green-200 dark:border-green-800 bg-green-50/30 dark:bg-green-900/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-green-700 dark:text-green-400">Đã xuất bản</p>
              <p className="text-lg font-semibold text-green-900 dark:text-green-300">
                {postsWithMeta.filter((p) => p.status === "published").length}
              </p>
            </div>
            <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
          </div>
        </Card>

        <Card className="p-3 border border-orange-200 dark:border-orange-800 bg-orange-50/30 dark:bg-orange-900/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-orange-700 dark:text-orange-400">Bản nháp</p>
              <p className="text-lg font-semibold text-orange-900 dark:text-orange-300">
                {postsWithMeta.filter((p) => p.status === "draft").length}
              </p>
            </div>
            <Edit className="h-4 w-4 text-orange-600 dark:text-orange-400" />
          </div>
        </Card>

        <Card className="p-3 border border-purple-200 dark:border-purple-800 bg-purple-50/30 dark:bg-purple-900/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-purple-700 dark:text-purple-400">Đã lên lịch</p>
              <p className="text-lg font-semibold text-purple-900 dark:text-purple-300">
                {postsWithMeta.filter((p) => p.status === "scheduled").length}
              </p>
            </div>
            <Calendar className="h-4 w-4 text-purple-600 dark:text-purple-400" />
          </div>
        </Card>
      </div>

      {/* Filter and Controls - Compact */}
      <Card className="p-4">
        <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Bộ lọc và hiển thị
        </h3>
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Search className="w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm bài viết..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-9 text-sm w-full sm:w-48"
            />
          </div>

          <select className="px-3 py-2 h-9 border rounded-md text-sm w-full sm:w-auto">
            <option value="">Tất cả trạng thái</option>
            <option value="published">Đã xuất bản</option>
            <option value="draft">Bản nháp</option>
            <option value="scheduled">Đã lên lịch</option>
          </select>

          <select className="px-3 py-2 h-9 border rounded-md text-sm w-full sm:w-auto">
            <option value="">Tất cả danh mục</option>
            <option value="tech">Công nghệ</option>
            <option value="tutorial">Hướng dẫn</option>
            <option value="review">Đánh giá</option>
          </select>

          <div className="flex items-center gap-2 sm:ml-auto">
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="h-9 px-3"
            >
              <List className="w-3.5 h-3.5" />
            </Button>
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="h-9 px-3"
            >
              <Grid className="w-3.5 h-3.5" />
            </Button>
            <Button variant="outline" size="sm" className="h-9 px-3">
              <SortDesc className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Posts List/Grid - Clean */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Danh sách bài viết ({filteredPosts.length})
          </h3>
          <Button variant="outline" size="sm" className="h-8 px-3">
            <Settings className="w-3.5 h-3.5" />
          </Button>
        </div>

        {viewMode === "list" ? (
          <div className="space-y-3">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-sm font-medium hover:text-primary cursor-pointer line-clamp-1">
                          {post.title}
                        </h3>
                        <p className="text-xs text-muted-foreground line-clamp-1 mt-1">
                          {post.content.substring(0, 100)}...
                        </p>
                      </div>
                      <div className="flex items-center gap-2 ml-3">
                        {getStatusBadge(post.status)}
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <MoreHorizontal className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>

                    {/* Tags - Compact */}
                    <div className="flex items-center gap-1 flex-wrap">
                      {post.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag.id} variant="outline" className="text-xs h-5">
                          {tag.name}
                        </Badge>
                      ))}
                      {post.tags.length > 2 && (
                        <span className="text-xs text-muted-foreground">
                          +{post.tags.length - 2}
                        </span>
                      )}
                    </div>

                    {/* Meta and Stats - Inline */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(post.createdAt).toLocaleDateString("vi-VN")}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {post.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="w-3 h-3" />
                          {post.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="w-3 h-3" />
                          {post.comments}
                        </span>
                      </div>

                      {/* Actions - Compact */}
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                          <Edit className="w-3 h-3 mr-1" />
                          Sửa
                        </Button>
                        <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                          <Eye className="w-3 h-3 mr-1" />
                          Xem
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 px-2 text-xs text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="p-3 hover:shadow-lg transition-shadow">
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <h3 className="text-sm font-medium line-clamp-2 hover:text-primary cursor-pointer">
                      {post.title}
                    </h3>
                    {getStatusBadge(post.status)}
                  </div>

                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {post.content.substring(0, 80)}...
                  </p>

                  {/* Tags */}
                  <div className="flex items-center gap-1 flex-wrap">
                    {post.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag.id} variant="outline" className="text-xs h-5">
                        {tag.name}
                      </Badge>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {post.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="w-3 h-3" />
                      {post.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-3 h-3" />
                      {post.comments}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 pt-1">
                    <Button variant="outline" size="sm" className="flex-1 h-7 text-xs">
                      <Edit className="w-3 h-3 mr-1" />
                      Sửa
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 h-7 text-xs">
                      <Eye className="w-3 h-3 mr-1" />
                      Xem
                    </Button>
                  </div>

                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(post.createdAt).toLocaleDateString("vi-VN")}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default AllPostsPage;
