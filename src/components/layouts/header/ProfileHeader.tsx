"use client";

import { LogoVertical } from "@/components/shared/logo";
import { UserMenu } from "@/components/shared/user-menu";

export const ProfileHeader = () => {
  return (
    <header className="border-b ">
      <div className="flex items-center justify-between py-4 container">
        <LogoVertical />

        <div className="flex items-center space-x-4">
          <UserMenu />
        </div>
      </div>
    </header>
  );
};
