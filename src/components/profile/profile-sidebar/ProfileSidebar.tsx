"use client";

import * as React from "react";

import { Sidebar, SidebarContent, SidebarRail } from "@/components/shared/Sidebar";
import {
  Activity,
  Bookmark,
  BookOpen,
  History,
  IdCard,
  KeyRound,
  Lock,
  Mail,
  Pen,
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
        title: t("info"),
        icon: IdCard,
        items: [
          {
            title: t("personalInfo"),
            url: ROUTE_PATHS.ME.INFO,
            icon: User,
          },
          {
            title: t("email"),
            url: ROUTE_PATHS.ME.EMAIL,
            icon: Mail,
          },
        ],
      },
      {
        title: t("security"),
        icon: Lock,
        items: [
          {
            title: t("changePassword"),
            url: ROUTE_PATHS.ME.PASSWORD,
            icon: KeyRound,
          },
        ],
      },
      {
        title: t("activity"),
        icon: Activity,
        items: [
          {
            title: t("history"),
            url: ROUTE_PATHS.ME.HISTORY,
            icon: History,
          },
        ],
      },
      {
        title: t("myBookmark"),
        icon: Bookmark,
        items: [
          {
            title: t("bookmarkPost"),
            url: ROUTE_PATHS.ME.BOOKMARK_POST,
            icon: Pen,
          },
          {
            title: t("bookmarkSeries"),
            url: ROUTE_PATHS.ME.BOOKMARK_SERIES,
            icon: BookOpen,
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
