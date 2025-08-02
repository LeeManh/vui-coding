"use client";

import Link from "next/link";
import { Button } from "@/components/shared/Button";
import { LogoVertical } from "@/components/shared/logo";
import { UserMenu } from "@/components/shared/user-menu";
import { ROUTE_PATHS } from "@/constants/route-paths";
import { useAuth } from "@/contexts/auth-context";
import { useTranslations } from "next-intl";
import { SearchPost } from "@/components/home/search-post";
import { LanguageSwitcher } from "@/components/shared/language-switcher";
// import { ThemeSwitcher } from "@/components/shared/theme-switcher";

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

          {/* <ThemeSwitcher /> */}

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
