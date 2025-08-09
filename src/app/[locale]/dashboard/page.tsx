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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/Card";
import { Button } from "@/components/shared/Button";

const DashboardPage = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Tổng quan Dashboard</h1>
          <p className="text-muted-foreground">Xin chào! Đây là tổng quan về blog của bạn</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Viết bài mới
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng bài viết</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUp className="w-3 h-3 text-green-500 mr-1" />
              +3 từ tháng trước
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lượt xem tháng này</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,430</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUp className="w-3 h-3 text-green-500 mr-1" />
              +15.3% từ tháng trước
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng likes</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUp className="w-3 h-3 text-green-500 mr-1" />
              +8.1% từ tháng trước
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Comments</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowDown className="w-3 h-3 text-red-500 mr-1" />
              -2.1% từ tháng trước
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Charts Section */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Lượt xem 7 ngày qua
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-between gap-2">
              {[420, 380, 560, 720, 680, 820, 920].map((value, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div
                    className="w-8 bg-blue-500 rounded-t"
                    style={{ height: `${(value / 1000) * 200}px` }}
                  ></div>
                  <span className="text-xs mt-2 text-muted-foreground">
                    {index === 6 ? "Hôm nay" : `${7 - index} ngày`}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Posts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Top bài viết
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: "Hướng dẫn React Hooks cơ bản", views: 1230, trend: "up" },
                { title: "Next.js 14: Những tính năng mới", views: 980, trend: "up" },
                { title: "TypeScript cho người mới bắt đầu", views: 756, trend: "down" },
                { title: "Tối ưu hóa performance React", views: 654, trend: "up" },
                { title: "CSS Grid vs Flexbox", views: 543, trend: "up" },
              ].map((post, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 hover:bg-muted/50 rounded"
                >
                  <div className="flex-1">
                    <p className="font-medium text-sm truncate">{post.title}</p>
                    <p className="text-xs text-muted-foreground">{post.views} lượt xem</p>
                  </div>
                  {post.trend === "up" ? (
                    <ArrowUp className="w-4 h-4 text-green-500" />
                  ) : (
                    <ArrowDown className="w-4 h-4 text-red-500" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Hoạt động gần đây
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { type: "comment", text: "Bình luận mới từ Nguyễn Văn A", time: "5 phút trước" },
                { type: "like", text: "3 likes mới cho bài 'React Hooks'", time: "15 phút trước" },
                {
                  type: "post",
                  text: "Bài viết 'Next.js Tips' đã được xuất bản",
                  time: "2 giờ trước",
                },
                { type: "bookmark", text: "5 bookmarks mới", time: "3 giờ trước" },
              ].map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm">{activity.text}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Quản lý nhanh
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded">
                <span className="text-sm">Bài nháp</span>
                <span className="font-bold">7</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded">
                <span className="text-sm">Đã lên lịch</span>
                <span className="font-bold">3</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded">
                <span className="text-sm">Cần trả lời</span>
                <span className="font-bold text-orange-500">5</span>
              </div>
              <Button className="w-full mt-4">
                <Plus className="w-4 h-4 mr-2" />
                Tạo bài viết mới
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Goals & KPIs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              Mục tiêu tháng này
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Bài viết mới</span>
                  <span className="text-sm font-medium">3/5</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: "60%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Lượt xem</span>
                  <span className="text-sm font-medium">12.4K/15K</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: "83%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Engagement</span>
                  <span className="text-sm font-medium">7.2%/8%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: "90%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Thông báo & Cảnh báo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-green-800">Backup thành công</p>
                <p className="text-xs text-green-600">Hôm nay 14:30</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded">
              <Users className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-blue-800">5 người dùng mới</p>
                <p className="text-xs text-blue-600">Tuần này</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-orange-50 border border-orange-200 rounded">
              <Calendar className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-sm font-medium text-orange-800">Bài sắp xuất bản</p>
                <p className="text-xs text-orange-600">Mai 9:00 AM</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-purple-50 border border-purple-200 rounded">
              <Bookmark className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-purple-800">Milestone đạt được</p>
                <p className="text-xs text-purple-600">1000 bookmarks</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;
