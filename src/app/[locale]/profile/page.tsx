"use client";

import ProfileCard from "@/components/profile/ProfileCard";
import AvatarUser from "@/components/ui/AvatarUser";
import { ROUTE_PATHS } from "@/constants/route-paths.constant";
import { useAuth } from "@/contexts/AuthContext";
import { KeyRound, Mail, User } from "lucide-react";
import { useTranslations } from "next-intl";

const ProfilePage = () => {
  const { user } = useAuth();
  const t = useTranslations("Profile");

  const cardConfigs = [
    {
      title: t("personalInfo"),
      icon: <User className="w-6 h-6" />,
      href: ROUTE_PATHS.PROFILE.INFO,
    },
    {
      title: t("email"),
      icon: <Mail className="w-6 h-6" />,
      href: ROUTE_PATHS.PROFILE.EMAIL,
    },
    {
      title: t("password"),
      icon: <KeyRound className="w-6 h-6" />,
      href: ROUTE_PATHS.PROFILE.PASSWORD,
    },
  ];

  return (
    <div className="mx-auto max-w-4xl">
      <div>
        <AvatarUser avatar={user?.avatar} username={user?.username} className="w-24 h-24 mx-auto" />
        <div className="text-2xl font-bold text-center mt-4">
          {t("welcome", { username: user?.username ?? "" })}
        </div>
        <div className="text-center text-gray-500 mt-1">{t("description")}</div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-8">
        {cardConfigs.map((config, index) => (
          <ProfileCard key={index} {...config} />
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
