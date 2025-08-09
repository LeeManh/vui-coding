"use client";

import Link from "next/link";
import { Button } from "@/components/shared/Button";
import { LogoVertical } from "@/components/shared/logo";
import { UserMenu } from "@/components/shared/user-menu";
import { ROUTE_PATHS } from "@/constants/route-paths";
import { useAuth } from "@/contexts/auth-context";
import { LanguageSwitcher } from "@/components/shared/language-switcher";
import { SearchInput } from "@/components/shared/search-input";

export const MainHeader = () => {
  const { isAuthenticated } = useAuth();

  return (
    <header className="border-b border-gray-200/60 dark:border-gray-800/60 bg-white dark:bg-gray-950">
      <div className="app-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Smaller */}
          <div className="flex-shrink-0">
            <LogoVertical />
          </div>

          {/* Actions - Compact */}
          <div className="flex items-center space-x-3">
            {/* Search - Compact */}
            <div className="hidden sm:block">
              <SearchInput />
            </div>

            {/* Language - Small */}
            <div className="scale-90">
              <LanguageSwitcher />
            </div>

            {/* Auth - Small */}
            {isAuthenticated ? (
              <div className="scale-90">
                <UserMenu />
              </div>
            ) : (
              <Link href={ROUTE_PATHS.AUTH.SIGN_IN}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 px-2 text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
                >
                  Đăng nhập
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Search - Minimal */}
        <div className="sm:hidden py-2 border-t border-gray-200/40 dark:border-gray-800/40">
          <SearchInput className="mx-auto" />
        </div>
      </div>
    </header>
  );
};
