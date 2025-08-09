"use client";

import React from "react";
import {
  BarChart3,
  TrendingUp,
  Users,
  FileText,
  Eye,
  Heart,
  MessageCircle,
  Bookmark,
  Calendar,
  Clock,
  Target,
  Award,
  AlertTriangle,
  CheckCircle,
  Plus,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { Card } from "@/components/shared/Card";
import { Button } from "@/components/shared/Button";

const DashboardPage = () => {
  return (
    <div className="space-y-4">
      {/* Header - Minimal */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-lg font-semibold">Tổng quan Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Xin chào! Đây là tổng quan về blog của bạn
          </p>
        </div>
        <Button size="sm" className="h-8 px-3">
          <Plus className="w-3 h-3 mr-1" />
          Viết bài mới
        </Button>
      </div>

      {/* Stats Overview - Compact Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Card className="p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Bài viết</p>
              <p className="text-lg font-semibold">42</p>
            </div>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </div>
          <p className="text-xs text-green-600 flex items-center mt-1">
            <ArrowUp className="w-3 h-3 mr-1" />
            +3 tháng trước
          </p>
        </Card>

        <Card className="p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Lượt xem</p>
              <p className="text-lg font-semibold">12.4K</p>
            </div>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </div>
          <p className="text-xs text-green-600 flex items-center mt-1">
            <ArrowUp className="w-3 h-3 mr-1" />
            +15.3%
          </p>
        </Card>

        <Card className="p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Likes</p>
              <p className="text-lg font-semibold">1.2K</p>
            </div>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </div>
          <p className="text-xs text-green-600 flex items-center mt-1">
            <ArrowUp className="w-3 h-3 mr-1" />
            +8.1%
          </p>
        </Card>

        <Card className="p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Comments</p>
              <p className="text-lg font-semibold">89</p>
            </div>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </div>
          <p className="text-xs text-red-600 flex items-center mt-1">
            <ArrowDown className="w-3 h-3 mr-1" />
            -2.1%
          </p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Charts Section - Simplified */}
        <Card className="p-4">
          <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Lượt xem 7 ngày qua
          </h3>
          <div className="space-y-1">
            {[
              { value: 920, label: "Hôm nay", day: "T8" },
              { value: 820, label: "Hôm qua", day: "T7" },
              { value: 680, label: "3 ngày trước", day: "T6" },
              { value: 720, label: "4 ngày trước", day: "T5" },
              { value: 560, label: "5 ngày trước", day: "T4" },
              { value: 380, label: "6 ngày trước", day: "T3" },
              { value: 420, label: "7 ngày trước", day: "T2" },
            ].map((item, index) => {
              const maxValue = 1000;
              const percentage = (item.value / maxValue) * 100;
              return (
                <div key={index} className="flex items-center gap-3 py-1">
                  <div className="w-8 text-xs text-muted-foreground font-medium">{item.day}</div>
                  <div className="flex-1 flex items-center gap-2">
                    <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <div className="w-12 text-xs font-medium text-right">{item.value}</div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Tổng lượt xem</span>
              <span className="font-medium">4,400 views</span>
            </div>
          </div>
        </Card>

        {/* Top Posts - Compact */}
        <Card className="p-4">
          <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Top bài viết
          </h3>
          <div className="space-y-2">
            {[
              { title: "Hướng dẫn React Hooks cơ bản", views: 1230, trend: "up" },
              { title: "Next.js 14: Những tính năng mới", views: 980, trend: "up" },
              { title: "TypeScript cho người mới bắt đầu", views: 756, trend: "down" },
              { title: "Tối ưu hóa performance React", views: 654, trend: "up" },
              { title: "CSS Grid vs Flexbox", views: 543, trend: "up" },
            ].map((post, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 hover:bg-muted/50 rounded text-sm"
              >
                <div className="flex-1 min-w-0">
                  <p className="truncate font-medium">{post.title}</p>
                  <p className="text-xs text-muted-foreground">{post.views} lượt xem</p>
                </div>
                {post.trend === "up" ? (
                  <ArrowUp className="w-3 h-3 text-green-500 ml-2" />
                ) : (
                  <ArrowDown className="w-3 h-3 text-red-500 ml-2" />
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent Activities - Minimal */}
        <Card className="p-4">
          <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Hoạt động gần đây
          </h3>
          <div className="space-y-2">
            {[
              { text: "Bình luận mới từ Nguyễn Văn A", time: "5 phút" },
              { text: "3 likes mới cho bài 'React Hooks'", time: "15 phút" },
              { text: "Bài viết 'Next.js Tips' đã xuất bản", time: "2 giờ" },
              { text: "5 bookmarks mới", time: "3 giờ" },
            ].map((activity, index) => (
              <div key={index} className="flex gap-2 text-sm">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="min-w-0">
                  <p className="text-sm">{activity.text}</p>
                  <p className="text-xs text-muted-foreground">{activity.time} trước</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions - Compact */}
        <Card className="p-4">
          <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
            <Target className="w-4 h-4" />
            Quản lý nhanh
          </h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 bg-muted/30 rounded text-sm">
              <span>Bài nháp</span>
              <span className="font-semibold">7</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-muted/30 rounded text-sm">
              <span>Đã lên lịch</span>
              <span className="font-semibold">3</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-muted/30 rounded text-sm">
              <span>Cần trả lời</span>
              <span className="font-semibold text-orange-500">5</span>
            </div>
            <Button size="sm" className="w-full mt-3 h-8">
              <Plus className="w-3 h-3 mr-1" />
              Tạo bài viết mới
            </Button>
          </div>
        </Card>

        {/* Goals - Simplified */}
        <Card className="p-4">
          <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
            <Award className="w-4 h-4" />
            Mục tiêu tháng này
          </h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs">Bài viết mới</span>
                <span className="text-xs font-medium">3/5</span>
              </div>
              <div className="w-full bg-muted rounded-full h-1.5">
                <div className="bg-green-500 h-1.5 rounded-full" style={{ width: "60%" }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs">Lượt xem</span>
                <span className="text-xs font-medium">12.4K/15K</span>
              </div>
              <div className="w-full bg-muted rounded-full h-1.5">
                <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: "83%" }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs">Engagement</span>
                <span className="text-xs font-medium">7.2%/8%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-1.5">
                <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: "90%" }}></div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Notifications - Compact Grid */}
      <Card className="p-4">
        <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          Thông báo & Cảnh báo
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="flex items-center gap-2 p-2 bg-green-50 border border-green-200 rounded text-sm">
            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
            <div className="min-w-0">
              <p className="font-medium text-green-800 truncate">Backup thành công</p>
              <p className="text-xs text-green-600">Hôm nay 14:30</p>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2 bg-blue-50 border border-blue-200 rounded text-sm">
            <Users className="w-4 h-4 text-blue-600 flex-shrink-0" />
            <div className="min-w-0">
              <p className="font-medium text-blue-800 truncate">5 người dùng mới</p>
              <p className="text-xs text-blue-600">Tuần này</p>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2 bg-orange-50 border border-orange-200 rounded text-sm">
            <Calendar className="w-4 h-4 text-orange-600 flex-shrink-0" />
            <div className="min-w-0">
              <p className="font-medium text-orange-800 truncate">Bài sắp xuất bản</p>
              <p className="text-xs text-orange-600">Mai 9:00 AM</p>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2 bg-purple-50 border border-purple-200 rounded text-sm">
            <Bookmark className="w-4 h-4 text-purple-600 flex-shrink-0" />
            <div className="min-w-0">
              <p className="font-medium text-purple-800 truncate">Milestone đạt được</p>
              <p className="text-xs text-purple-600">1000 bookmarks</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DashboardPage;
