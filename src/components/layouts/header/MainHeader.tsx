"use client";

import Link from "next/link";
import { Button } from "@/components/shared/Button";
import { LogoVertical } from "@/components/shared/logo";
import { UserMenu } from "@/components/shared/user-menu";
import { ROUTE_PATHS } from "@/constants/route-paths";
import { useAuth } from "@/contexts/auth-context";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/components/shared/language-switcher";

export const MainHeader = () => {
  const { isAuthenticated } = useAuth();
  const t = useTranslations("Header");

  return (
    <header className="sticky top-0 bg-background z-10 shadow-md">
      <div className="flex items-center justify-between py-4 app-container">
        <LogoVertical />

        <div className="flex items-center space-x-4">
          <LanguageSwitcher />

          {isAuthenticated ? (
            <UserMenu />
          ) : (
            <Link href={ROUTE_PATHS.AUTH.SIGN_IN}>
              <Button variant="ghost">{t("loginOrRegister")}</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
