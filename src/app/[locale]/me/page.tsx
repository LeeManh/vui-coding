"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { BookOpen, Eye, Heart, FileText, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/Card";
import { useAuth } from "@/contexts/auth-context";

const ProfileOverviewPage = () => {
  const t = useTranslations("Profile");
  const { user } = useAuth();

  return (
    <div className="space-y-4">
      {/* Welcome Header - Minimal */}
      <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4">
        <h1 className="text-lg font-semibold mb-1">
          {t("welcome", { username: user?.displayName || user?.username || "User" })}
        </h1>
        <p className="text-sm text-muted-foreground">{t("description")}</p>
      </div>

      {/* Quick Stats - Compact */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Card className="p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Đã đọc</p>
              <p className="text-lg font-semibold">142</p>
            </div>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </div>
        </Card>

        <Card className="p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Thời gian</p>
              <p className="text-lg font-semibold">24h</p>
            </div>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </div>
        </Card>

        <Card className="p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Bookmarks</p>
              <p className="text-lg font-semibold">18</p>
            </div>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </div>
        </Card>

        <Card className="p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Likes</p>
              <p className="text-lg font-semibold">287</p>
            </div>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Reading - Simplified */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Đọc gần đây
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { title: "React Hooks cơ bản", author: "Nguyễn A", time: "Hôm nay" },
              { title: "Next.js App Router", author: "Trần B", time: "Hôm qua" },
              { title: "TypeScript Best Practices", author: "Lê C", time: "2 ngày" },
            ].map((article, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800 last:border-0"
              >
                <div>
                  <p className="text-sm font-medium">{article.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {article.author} • {article.time}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Account Info - Minimal */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <User className="w-4 h-4" />
              Thông tin tài khoản
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div>
                <p className="text-xs text-muted-foreground">Tên hiển thị</p>
                <p className="text-sm font-medium">{user?.displayName || "Chưa cập nhật"}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Username</p>
                <p className="text-sm font-medium">@{user?.username}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Tham gia</p>
                <p className="text-sm font-medium">
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString("vi-VN") : "N/A"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileOverviewPage;
