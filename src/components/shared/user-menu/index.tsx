"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "../DropdownMenu";
import {
  LogOut,
  User,
  Settings,
  Bookmark,
  History,
  FileText,
  BarChart3,
  Lock,
  BookOpen,
  Plus,
} from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { AvatarUser } from "@/components/shared/avatar-user";
import { ROUTE_PATHS } from "@/constants/route-paths";
import Link from "next/link";
import { getUserDisplayName } from "@/lib/format";

export const UserMenu = () => {
  const { logout, user, isLoadingUser } = useAuth();

  const handleSignOut = () => logout();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild disabled={isLoadingUser}>
        <AvatarUser
          avatar={user?.avatar}
          username={getUserDisplayName(user)}
          className="cursor-pointer w-8 h-8 ring-1 ring-gray-200 dark:ring-gray-700 hover:ring-primary/30 transition-all"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="end">
        {/* User Info Header - Minimal */}
        <div className="flex items-center gap-2 p-3 border-b border-gray-100 dark:border-gray-800">
          <AvatarUser
            avatar={user?.avatar}
            username={getUserDisplayName(user)}
            className="w-9 h-9"
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-sm text-foreground truncate">
              {getUserDisplayName(user)}
            </h3>
            <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
          </div>
        </div>

        {/* Profile & Settings */}
        <DropdownMenuGroup>
          <DropdownMenuLabel className="px-3 py-1.5 text-xs text-muted-foreground">
            Tài khoản
          </DropdownMenuLabel>
          <Link href={ROUTE_PATHS.ME.ROOT}>
            <DropdownMenuItem className="px-3 py-1.5 text-sm">
              <User className="w-3.5 h-3.5 mr-2.5 text-muted-foreground" />
              Hồ sơ cá nhân
            </DropdownMenuItem>
          </Link>

          <Link href={ROUTE_PATHS.ME.INFO}>
            <DropdownMenuItem className="px-3 py-1.5 text-sm">
              <Settings className="w-3.5 h-3.5 mr-2.5 text-muted-foreground" />
              Cài đặt tài khoản
            </DropdownMenuItem>
          </Link>

          <Link href={ROUTE_PATHS.ME.PASSWORD}>
            <DropdownMenuItem className="px-3 py-1.5 text-sm">
              <Lock className="w-3.5 h-3.5 mr-2.5 text-muted-foreground" />
              Đổi mật khẩu
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {/* Content & Activities */}
        <DropdownMenuGroup>
          <DropdownMenuLabel className="px-3 py-1.5 text-xs text-muted-foreground">
            Nội dung
          </DropdownMenuLabel>
          <Link href={ROUTE_PATHS.ME.BOOKMARK_POST}>
            <DropdownMenuItem className="px-3 py-1.5 text-sm">
              <Bookmark className="w-3.5 h-3.5 mr-2.5 text-muted-foreground" />
              Bài viết đã lưu
            </DropdownMenuItem>
          </Link>

          <Link href={ROUTE_PATHS.ME.BOOKMARK_SERIES}>
            <DropdownMenuItem className="px-3 py-1.5 text-sm">
              <BookOpen className="w-3.5 h-3.5 mr-2.5 text-muted-foreground" />
              Series đã lưu
            </DropdownMenuItem>
          </Link>

          <Link href={ROUTE_PATHS.ME.HISTORY}>
            <DropdownMenuItem className="px-3 py-1.5 text-sm">
              <History className="w-3.5 h-3.5 mr-2.5 text-muted-foreground" />
              Lịch sử đọc
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {/* Creator Tools */}
        <DropdownMenuGroup>
          <DropdownMenuLabel className="px-3 py-1.5 text-xs text-muted-foreground">
            Công cụ tác giả
          </DropdownMenuLabel>
          <Link href={ROUTE_PATHS.DASHBOARD.ROOT}>
            <DropdownMenuItem className="px-3 py-1.5 text-sm">
              <BarChart3 className="w-3.5 h-3.5 mr-2.5 text-muted-foreground" />
              Dashboard
            </DropdownMenuItem>
          </Link>

          <Link href="/dashboard/posts/create">
            <DropdownMenuItem className="px-3 py-1.5 text-sm">
              <Plus className="w-3.5 h-3.5 mr-2.5 text-muted-foreground" />
              Viết bài mới
            </DropdownMenuItem>
          </Link>

          <Link href="/dashboard/posts">
            <DropdownMenuItem className="px-3 py-1.5 text-sm">
              <FileText className="w-3.5 h-3.5 mr-2.5 text-muted-foreground" />
              Bài viết của tôi
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {/* Logout */}
        <DropdownMenuItem
          className="px-3 py-1.5 text-sm text-red-600 dark:text-red-400 cursor-pointer focus:text-red-600 dark:focus:text-red-400"
          onClick={handleSignOut}
        >
          <LogOut className="w-3.5 h-3.5 mr-2.5" />
          Đăng xuất
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
