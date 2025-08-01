"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import LogoVertical from "@/components/ui/Logo/LogoVertical";
import UserMenu from "../UserMenu";
import { ROUTE_PATHS } from "@/constants/route-paths.constant";
import { useAuth } from "@/contexts/AuthContext";
import SearchPost from "../SearchPost";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "../LanguageSwitcher";
import ThemeSwitcher from "../ThemeSwitcher";

export const MainHeader = () => {
  const { isAuthenticated } = useAuth();
  const t = useTranslations("Header");

  return (
    <header className="border-b">
      <div className="flex items-center justify-between py-4 app-container">
        <LogoVertical />

        <div className="flex items-center space-x-4">
          <SearchPost />

          <LanguageSwitcher />

          <ThemeSwitcher />

          {isAuthenticated ? (
            <UserMenu />
          ) : (
            <Link href={ROUTE_PATHS.AUTH.SIGN_IN}>
              <Button variant="ghost">{t("login")}</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
