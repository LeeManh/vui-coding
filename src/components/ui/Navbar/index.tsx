"use client";

import React from "react";
import { usePathname } from "next/navigation";
import NavbarItem from "./NavbarItem";
import { ROUTE_PATHS } from "@/constants/route-paths.constant";

const items = [
  {
    href: ROUTE_PATHS.HOME,
    label: "Home",
  },
  {
    href: "/archive",
    label: "Archive",
  },
];

const Navbar = () => {
  const pathname = usePathname();
  return (
    <div className="border-b ">
      <div className="h-[46px] app-container flex items-center justify-center">
        {items.map((item, index) => {
          const isActive = pathname === item.href;

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
