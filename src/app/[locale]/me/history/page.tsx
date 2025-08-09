"use client";

import React, { useState } from "react";
import { FilterHistory } from "@/components/profile/history/filter";
import { useTranslations } from "next-intl";
import { Card } from "@/components/shared/Card";
import { Badge } from "@/components/shared/Badge";
import { Button } from "@/components/shared/Button";
import {
  History,
  Activity,
  TrendingUp,
  Calendar,
  Heart,
  MessageCircle,
  Eye,
  Edit,
  FileText,
  Bookmark,
  Share2,
  User,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const ProfileHistoryPage = () => {
  const t = useTranslations();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Mock data for activity history
  const activityData = [
    {
      id: 1,
      type: "like",
      action: "Thích bài viết",
      target: "10 Lý do nên học React trong năm 2024",
      targetType: "post",
      timestamp: "2024-08-09T10:30:00Z",
      status: "active",
    },
    {
      id: 2,
      type: "comment",
      action: "Bình luận",
      target: "Hướng dẫn sử dụng Next.js hiệu quả",
      targetType: "post",
      timestamp: "2024-08-09T09:15:00Z",
      status: "active",
    },
    {
      id: 3,
      type: "view",
      action: "Xem bài viết",
      target: "TypeScript cho người mới bắt đầu",
      targetType: "post",
      timestamp: "2024-08-08T16:45:00Z",
      status: "active",
    },
    {
      id: 4,
      type: "edit",
      action: "Chỉnh sửa bài viết",
      target: "Cách tối ưu performance React",
      targetType: "post",
      timestamp: "2024-08-08T14:20:00Z",
      status: "active",
    },
    {
      id: 5,
      type: "bookmark",
      action: "Lưu bài viết",
      target: "Design patterns trong JavaScript",
      targetType: "post",
      timestamp: "2024-08-08T11:30:00Z",
      status: "active",
    },
    {
      id: 6,
      type: "share",
      action: "Chia sẻ bài viết",
      target: "Microservices với Node.js",
      targetType: "post",
      timestamp: "2024-08-07T20:15:00Z",
      status: "active",
    },
    {
      id: 7,
      type: "follow",
      action: "Theo dõi người dùng",
      target: "John Doe",
      targetType: "user",
      timestamp: "2024-08-07T18:00:00Z",
      status: "active",
    },
    {
      id: 8,
      type: "create",
      action: "Tạo bài viết mới",
      target: "Giới thiệu về GraphQL",
      targetType: "post",
      timestamp: "2024-08-07T15:45:00Z",
      status: "active",
    },
    {
      id: 9,
      type: "like",
      action: "Thích bình luận",
      target: "Bình luận về Docker containers",
      targetType: "comment",
      timestamp: "2024-08-07T13:20:00Z",
      status: "active",
    },
    {
      id: 10,
      type: "view",
      action: "Xem series",
      target: "React Hook Tutorial Series",
      targetType: "series",
      timestamp: "2024-08-06T19:30:00Z",
      status: "active",
    },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "like":
        return <Heart className="w-4 h-4" />;
      case "comment":
        return <MessageCircle className="w-4 h-4" />;
      case "view":
        return <Eye className="w-4 h-4" />;
      case "edit":
        return <Edit className="w-4 h-4" />;
      case "create":
        return <FileText className="w-4 h-4" />;
      case "bookmark":
        return <Bookmark className="w-4 h-4" />;
      case "share":
        return <Share2 className="w-4 h-4" />;
      case "follow":
        return <User className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case "like":
        return "text-red-600 bg-red-50 dark:bg-red-900/20";
      case "comment":
        return "text-blue-600 bg-blue-50 dark:bg-blue-900/20";
      case "view":
        return "text-gray-600 bg-gray-50 dark:bg-gray-900/20";
      case "edit":
        return "text-orange-600 bg-orange-50 dark:bg-orange-900/20";
      case "create":
        return "text-green-600 bg-green-50 dark:bg-green-900/20";
      case "bookmark":
        return "text-purple-600 bg-purple-50 dark:bg-purple-900/20";
      case "share":
        return "text-cyan-600 bg-cyan-50 dark:bg-cyan-900/20";
      case "follow":
        return "text-pink-600 bg-pink-50 dark:bg-pink-900/20";
      default:
        return "text-gray-600 bg-gray-50 dark:bg-gray-900/20";
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} ngày trước`;
    if (hours > 0) return `${hours} giờ trước`;
    return "Vừa xong";
  };

  const totalPages = Math.ceil(activityData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = activityData.slice(startIndex, endIndex);

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {/* Header - Minimal */}
      <div className="mb-6">
        <h1 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <History className="w-4 h-4" />
          {t("Profile.history")}
        </h1>
        <p className="text-sm text-muted-foreground">{t("Profile.historyDescription")}</p>
      </div>

      {/* Activity Statistics - Compact Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Card className="p-3 border border-blue-200 dark:border-blue-800 bg-blue-50/30 dark:bg-blue-900/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-blue-700 dark:text-blue-400">Tổng hoạt động</p>
              <p className="text-lg font-semibold text-blue-900 dark:text-blue-300">1,247</p>
            </div>
            <Activity className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </div>
          <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">+12% tháng trước</p>
        </Card>

        <Card className="p-3 border border-green-200 dark:border-green-800 bg-green-50/30 dark:bg-green-900/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-green-700 dark:text-green-400">Tuần này</p>
              <p className="text-lg font-semibold text-green-900 dark:text-green-300">89</p>
            </div>
            <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
          </div>
          <p className="text-xs text-green-600 dark:text-green-400 mt-1">+8% tuần trước</p>
        </Card>

        <Card className="p-3 border border-purple-200 dark:border-purple-800 bg-purple-50/30 dark:bg-purple-900/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-purple-700 dark:text-purple-400">Hôm nay</p>
              <p className="text-lg font-semibold text-purple-900 dark:text-purple-300">12</p>
            </div>
            <Calendar className="h-4 w-4 text-purple-600 dark:text-purple-400" />
          </div>
          <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">Đọc, like, comment</p>
        </Card>
      </div>

      {/* Filter Section - Simplified */}
      <Card className="p-4">
        <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
          <Activity className="w-4 h-4" />
          Bộ lọc hoạt động
        </h3>
        <FilterHistory />
      </Card>

      {/* History Table - Clean */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium flex items-center gap-2">
            <History className="w-4 h-4" />
            Lịch sử hoạt động
          </h3>
          <div className="text-xs text-muted-foreground">Tổng: {activityData.length} hoạt động</div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Hoạt động
                </th>
                <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Đối tượng
                </th>
                <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Loại
                </th>
                <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Thời gian
                </th>
                <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Trạng thái
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {currentData.map((activity) => (
                <tr key={activity.id} className="hover:bg-muted/30 transition-colors">
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${getActivityColor(activity.type)}`}>
                        {getActivityIcon(activity.type)}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">{activity.action}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-2">
                    <div className="text-sm text-foreground line-clamp-2 max-w-xs">
                      {activity.target}
                    </div>
                  </td>
                  <td className="py-3 px-2">
                    <Badge variant="secondary" className="text-xs h-6">
                      {activity.targetType === "post"
                        ? "Bài viết"
                        : activity.targetType === "comment"
                        ? "Bình luận"
                        : activity.targetType === "user"
                        ? "Người dùng"
                        : activity.targetType === "series"
                        ? "Series"
                        : "Khác"}
                    </Badge>
                  </td>
                  <td className="py-3 px-2">
                    <div className="text-sm text-muted-foreground">
                      {formatTimestamp(activity.timestamp)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(activity.timestamp).toLocaleDateString("vi-VN")}
                    </div>
                  </td>
                  <td className="py-3 px-2">
                    <Badge
                      variant={activity.status === "active" ? "default" : "secondary"}
                      className="text-xs h-6"
                    >
                      {activity.status === "active" ? "Hoạt động" : "Không hoạt động"}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <div className="text-xs text-muted-foreground">
            Hiển thị {startIndex + 1}-{Math.min(endIndex, activityData.length)} của{" "}
            {activityData.length} hoạt động
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "ghost"}
                  size="sm"
                  className="h-8 w-8 p-0 text-xs"
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProfileHistoryPage;
