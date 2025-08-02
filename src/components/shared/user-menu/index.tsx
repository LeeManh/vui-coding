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
import { useAuth } from "@/contexts/auth-context";
import { AvatarUser } from "@/components/shared/avatar-user";
import { ROUTE_PATHS } from "@/constants/route-paths";
import Link from "next/link";
import { useTranslations } from "next-intl";

export const UserMenu = () => {
  const t = useTranslations("UserMenu");
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

        <DropdownMenuGroup>
          <Link href={ROUTE_PATHS.PROFILE.ROOT}>
            <DropdownMenuItem>
              <User className="w-5 h-5 mr-3 text-foreground" />
              {t("profile")}
            </DropdownMenuItem>
          </Link>
          <Link href={ROUTE_PATHS.PROFILE.HISTORY}>
            <DropdownMenuItem>
              <History className="w-5 h-5 mr-3 text-foreground" />
              {t("history")}
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem>
            <Settings className="w-5 h-5 mr-3 text-foreground" />
            {t("settings")}
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {/* Account Management */}
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <ExternalLink className="w-5 h-5 mr-3 text-foreground" />
            {t("dashboard")}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive cursor-pointer" onClick={handleSignOut}>
            <LogOut className="w-5 h-5 mr-3 text-foreground" />
            {t("logout")}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
