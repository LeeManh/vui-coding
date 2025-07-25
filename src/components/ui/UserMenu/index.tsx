"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../DropdownMenu";
import { ExternalLink, LogOut, User, Settings, History } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import AvatarUser from "../AvatarUser";
import { ROUTE_PATHS } from "@/constants/route-paths.constant";
import Link from "next/link";

const UserMenu = () => {
  const { logout, user, isLoadingUser } = useAuth();

  const handleSignOut = () => logout();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild disabled={isLoadingUser}>
        <AvatarUser avatar={user?.avatar} username={user?.username} className="cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="start">
        <div className="flex items-center gap-3 p-2 border-b ">
          <AvatarUser avatar={user?.avatar} username={user?.username} />
          <div>
            <h3 className="text-sm">{user?.username}</h3>
            <p className="text-xs ">{user?.email}</p>
          </div>
        </div>

        {/* Navigation Items */}
        <DropdownMenuGroup>
          <Link href={ROUTE_PATHS.PROFILE}>
            <DropdownMenuItem>
              <User className="w-5 h-5 mr-3 text-foreground" />
              Profile
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem>
            <History className="w-5 h-5 mr-3 text-foreground" />
            Lịch sử hoạt động
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="w-5 h-5 mr-3 text-foreground" />
            Cài đặt
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {/* Account Management */}
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <ExternalLink className="w-5 h-5 mr-3 text-foreground" />
            Dashboard
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive cursor-pointer" onClick={handleSignOut}>
            <LogOut className="w-5 h-5 mr-3 text-foreground" />
            Đăng xuất
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
