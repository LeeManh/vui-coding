"use client";

import * as React from "react";
import {
  BarChart3,
  BookOpen,
  Calendar,
  FileText,
  Hash,
  Image,
  LayoutDashboard,
  MessageCircle,
  Settings,
  Users,
  Eye,
  Plus,
  Heart,
  Bookmark,
  TrendingUp,
} from "lucide-react";

import { Sidebar, SidebarContent, SidebarRail } from "@/components/shared/Sidebar";
import { ProfileMainMenu, Item } from "../profile/profile-sidebar/ProfileMainMenu";
import { ROUTE_PATHS } from "@/constants/route-paths";

export const DashBoardSidebar = () => {
  const data: Record<string, Item[]> = {
    navMain: [
      {
        title: "Tổng quan",
        icon: LayoutDashboard,
        url: ROUTE_PATHS.DASHBOARD.ROOT,
      },
      {
        title: "Bài viết",
        icon: FileText,
        items: [
          {
            title: "Tất cả bài viết",
            url: "/dashboard/posts",
            icon: Eye,
          },
          {
            title: "Viết bài mới",
            url: "/dashboard/posts/create",
            icon: Plus,
          },
        ],
      },
      {
        title: "Series",
        icon: BookOpen,
        items: [
          {
            title: "Tất cả series",
            url: "/dashboard/series",
            icon: Eye,
          },
          {
            title: "Tạo series mới",
            url: "/dashboard/series/create",
            icon: Plus,
          },
        ],
      },
      {
        title: "Thẻ tag",
        icon: Hash,
        items: [
          {
            title: "Quản lý tags",
            url: "/dashboard/tags",
            icon: Settings,
          },
          {
            title: "Tạo tag mới",
            url: "/dashboard/tags/create",
            icon: Plus,
          },
        ],
      },
      {
        title: "Media",
        icon: Image,
        items: [
          {
            title: "Thư viện ảnh",
            url: "/dashboard/media/images",
            icon: Image,
          },
          {
            title: "Upload media",
            url: "/dashboard/media/upload",
            icon: Plus,
          },
        ],
      },
      {
        title: "Tương tác",
        icon: MessageCircle,
        items: [
          {
            title: "Comments",
            url: "/dashboard/comments",
            icon: MessageCircle,
          },
          {
            title: "Likes",
            url: "/dashboard/likes",
            icon: Heart,
          },
          {
            title: "Bookmarks",
            url: "/dashboard/bookmarks",
            icon: Bookmark,
          },
        ],
      },
      {
        title: "Thống kê",
        icon: BarChart3,
        items: [
          {
            title: "Analytics",
            url: "/dashboard/analytics",
            icon: TrendingUp,
          },
          {
            title: "Lượt xem",
            url: "/dashboard/analytics/views",
            icon: Eye,
          },
        ],
      },
      {
        title: "Người dùng",
        icon: Users,
        url: "/dashboard/users",
      },
      {
        title: "Lịch xuất bản",
        icon: Calendar,
        url: "/dashboard/schedule",
      },
      {
        title: "Cài đặt",
        icon: Settings,
        items: [
          {
            title: "Cài đặt blog",
            url: "/dashboard/settings/blog",
            icon: Settings,
          },
          {
            title: "Cài đặt SEO",
            url: "/dashboard/settings/seo",
            icon: TrendingUp,
          },
        ],
      },
    ],
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <ProfileMainMenu items={data.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
};
