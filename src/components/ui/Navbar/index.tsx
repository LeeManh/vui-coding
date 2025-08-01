"use client";

import React from "react";
import { usePathname } from "next/navigation";
import NavbarItem from "./NavbarItem";
import { ROUTE_PATHS } from "@/constants/route-paths.constant";
import { useTranslations } from "next-intl";

const Navbar = () => {
  const t = useTranslations("Navbar");

  const items = [
    {
      href: ROUTE_PATHS.HOME,
      label: t("home"),
    },
    {
      href: ROUTE_PATHS.ARCHIVE,
      label: t("archive"),
    },
  ];
  const pathname = usePathname();

  return (
    <div className="border-b ">
      <div className="h-[46px] app-container flex items-center justify-center">
        {items.map((item, index) => {
          const isActive =
            pathname.includes(item.href) &&
            (item.href === "/" ? pathname.split("/").length === 2 : true);

          return (
            <NavbarItem key={index} href={item.href} isActive={isActive}>
              {item.label}
            </NavbarItem>
          );
        })}
      </div>
    </div>
  );
};

export default Navbar;
