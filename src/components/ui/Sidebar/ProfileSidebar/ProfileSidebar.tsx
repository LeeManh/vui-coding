"use client";

import * as React from "react";

import { Sidebar, SidebarContent, SidebarRail } from "@/components/ui/Sidebar";
import { Home, IdCard, KeyRound, Lock, Mail, User } from "lucide-react";
import { Item, ProfileMainMenu } from "./ProfileMainMenu";
import { ROUTE_PATHS } from "@/constants/route-paths.constant";
import { useTranslations } from "next-intl";

export interface ProfileSidebarProps extends React.ComponentProps<typeof Sidebar> {}

export const ProfileSidebar = ({ ...props }: ProfileSidebarProps) => {
  const t = useTranslations("Profile");
  const data: Record<string, Item[]> = {
    navMain: [
      {
        title: t("dashboard"),
        url: ROUTE_PATHS.PROFILE.ROOT,
        icon: Home,
      },
      {
        title: "Thông tin của tôi",
        icon: IdCard,
        isActive: true,
        items: [
          {
            title: "Thông tin cá nhân",
            url: ROUTE_PATHS.PROFILE.INFO,
            icon: User,
          },
          {
            title: "Email",
            url: ROUTE_PATHS.PROFILE.EMAIL,
            icon: Mail,
          },
        ],
      },
      {
        title: "Bảo mật",
        icon: Lock,
        isActive: true,
        items: [
          {
            title: "Mật khẩu",
            url: ROUTE_PATHS.PROFILE.PASSWORD,
            icon: KeyRound,
          },
        ],
      },
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <ProfileMainMenu items={data.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
};
