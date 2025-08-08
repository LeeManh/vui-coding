"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/shared/Tabs";
import { ROUTE_PATHS } from "@/constants/route-paths";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useNormalizedPathname } from "@/hooks/use-normalized-pathname";

export const Navbar = () => {
  const t = useTranslations();
  const router = useRouter();

  const tabs = React.useMemo(
    () => [
      {
        label: t("navbar.posts"),
        value: "posts",
        url: ROUTE_PATHS.HOME,
      },
      {
        label: t("navbar.series"),
        value: "series",
        url: ROUTE_PATHS.SERIES.ROOT,
      },
      {
        label: t("navbar.about"),
        value: "about",
        url: ROUTE_PATHS.ABOUT,
      },
    ],
    [t]
  );

  const normalizedPathname = useNormalizedPathname();

  const activeTab = React.useMemo(() => {
    if (!normalizedPathname) return undefined;
    const found = tabs.find(
      (tab) =>
        tab.url === normalizedPathname ||
        (tab.url !== "/" && normalizedPathname.startsWith(tab.url))
    );
    return found ? found.value : tabs[0].value;
  }, [normalizedPathname, tabs]);

  return (
    <nav className={cn("bg-gray-900 border-t border-gray-200")}>
      <div className="app-container">
        <Tabs value={activeTab} onValueChange={() => {}}>
          <TabsList className="bg-transparent border-none p-0 h-auto space-x-8">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className={cn(
                  "text-white py-5 px-0 transition-all duration-200 relative",
                  "bg-transparent border-none rounded-none h-auto font-medium",
                  "hover:text-gray-200",
                  "data-[state=active]:bg-transparent data-[state=active]:text-white",
                  "focus-visible:ring-0 focus-visible:outline-none cursor-pointer"
                )}
                onClick={() => router.push(tab.url)}
              >
                {tab.label}
                {activeTab === tab.value && (
                  <div className="absolute bottom-3 left-0 right-0 h-0.5 bg-white w-full"></div>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </nav>
  );
};
