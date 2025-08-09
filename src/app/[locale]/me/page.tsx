"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Activity, BookOpen, Eye, Heart, FileText, TrendingUp, User, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/Card";
import { useAuth } from "@/contexts/auth-context";

const ProfileOverviewPage = () => {
  const t = useTranslations("Profile");
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          {t("welcome", { username: user?.displayName || user?.username || "User" })}
        </h1>
        <p className="opacity-90">{t("description")}</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bài viết đã đọc</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-muted-foreground">Tổng số bài đã đọc</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Thời gian đọc</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24h</div>
            <p className="text-xs text-muted-foreground">Tổng thời gian</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bookmarks</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">Đã lưu</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Likes đã cho</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">287</div>
            <p className="text-xs text-muted-foreground">Tương tác tích cực</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Reading */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Bài viết đọc gần đây
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: "Hướng dẫn React Hooks cơ bản",
                  author: "Nguyễn Văn A",
                  readTime: "5 phút",
                  readDate: "Hôm nay",
                  liked: true,
                },
                {
                  title: "Next.js 14: App Router Deep Dive",
                  author: "Trần Thị B",
                  readTime: "12 phút",
                  readDate: "Hôm qua",
                  liked: false,
                },
                {
                  title: "TypeScript Best Practices 2024",
                  author: "Lê Văn C",
                  readTime: "8 phút",
                  readDate: "2 ngày trước",
                  liked: true,
                },
              ].map((article, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50"
                >
                  <div className="flex-1">
                    <p className="font-medium text-sm">{article.title}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                      <span>bởi {article.author}</span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                      <span>•</span>
                      <span>{article.readDate}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart
                      className={`w-4 h-4 ${
                        article.liked ? "text-red-500 fill-current" : "text-muted-foreground"
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Reading Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Hoạt động đọc gần đây
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  action: "Đã like bài viết",
                  title: "React Performance Tips",
                  time: "2 giờ trước",
                  type: "like",
                },
                {
                  action: "Bookmark bài viết",
                  title: "Vue.js 3 Composition API",
                  time: "1 ngày trước",
                  type: "bookmark",
                },
                {
                  action: "Bình luận",
                  title: "TypeScript Advanced Types",
                  time: "2 ngày trước",
                  type: "comment",
                },
                {
                  action: "Đọc xong",
                  title: "CSS Grid Layout Guide",
                  time: "3 ngày trước",
                  type: "read",
                },
              ].map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-2">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === "like"
                        ? "bg-red-500"
                        : activity.type === "bookmark"
                        ? "bg-purple-500"
                        : activity.type === "comment"
                        ? "bg-green-500"
                        : "bg-blue-500"
                    }`}
                  ></div>
                  <div className="flex-1">
                    <p className="text-sm">
                      {activity.action}: <span className="font-medium">{activity.title}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Reading Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Sở thích đọc
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Chủ đề yêu thích</span>
                  <span className="text-xs text-muted-foreground">React, TypeScript</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Streak đọc</span>
                  <span className="font-bold text-green-600">7 ngày</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Thời gian đọc TB/ngày</span>
                  <span className="font-bold">25 phút</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Thông tin tài khoản
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Tên hiển thị</p>
                <p className="font-medium">{user?.displayName || "Chưa cập nhật"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Username</p>
                <p className="font-medium">@{user?.username}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tham gia</p>
                <p className="font-medium">
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString("vi-VN") : "N/A"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reader Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              Thành tựu đọc giả
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-2 bg-blue-50 border border-blue-200 rounded">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-blue-800">Đọc giả tích cực</p>
                  <p className="text-xs text-blue-600">Đọc 100+ bài viết</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2 bg-green-50 border border-green-200 rounded">
                <Heart className="w-4 h-4 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-green-800">Fan trung thành</p>
                  <p className="text-xs text-green-600">Like 200+ bài viết</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2 bg-purple-50 border border-purple-200 rounded">
                <FileText className="w-4 h-4 text-purple-600" />
                <div>
                  <p className="text-sm font-medium text-purple-800">Collector</p>
                  <p className="text-xs text-purple-600">Bookmark 50+ bài viết</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileOverviewPage;
