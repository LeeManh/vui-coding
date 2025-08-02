"use client";

import * as React from "react";

import { Sidebar, SidebarContent, SidebarRail } from "@/components/shared/Sidebar";
import {
  Activity,
  History,
  IdCard,
  KeyRound,
  LayoutDashboard,
  Lock,
  Mail,
  User,
} from "lucide-react";
import { Item, ProfileMainMenu } from "./ProfileMainMenu";
import { ROUTE_PATHS } from "@/constants/route-paths";
import { useTranslations } from "next-intl";

export interface ProfileSidebarProps extends React.ComponentProps<typeof Sidebar> {}

export const ProfileSidebar = ({ ...props }: ProfileSidebarProps) => {
  const t = useTranslations("Profile");
  const data: Record<string, Item[]> = {
    navMain: [
      {
        title: t("dashboard"),
        url: ROUTE_PATHS.PROFILE.ROOT,
        icon: LayoutDashboard,
      },
      {
        title: t("info"),
        icon: IdCard,
        isActive: true,
        items: [
          {
            title: t("personalInfo"),
            url: ROUTE_PATHS.PROFILE.INFO,
            icon: User,
          },
          {
            title: t("email"),
            url: ROUTE_PATHS.PROFILE.EMAIL,
            icon: Mail,
          },
        ],
      },
      {
        title: t("security"),
        icon: Lock,
        isActive: true,
        items: [
          {
            title: t("changePassword"),
            url: ROUTE_PATHS.PROFILE.PASSWORD,
            icon: KeyRound,
          },
        ],
      },
      {
        title: t("activity"),
        icon: Activity,
        isActive: true,
        items: [
          {
            title: t("history"),
            url: ROUTE_PATHS.PROFILE.HISTORY,
            icon: History,
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
