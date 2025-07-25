"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const NavbarItem = ({
  href,
  children,
  isActive,
}: {
  href: string;
  children: React.ReactNode;
  isActive: boolean;
}) => {
  return (
    <Link
      href={href}
      className={cn(
        "cursor-pointer font-medium h-full flex items-center px-4 relative after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-2/3 after:h-[3px] after:bg-primary after:scale-x-0 transition-all duration-300 text-sm",
        isActive && "after:scale-x-100 font-semibold"
      )}
    >
      {children}
    </Link>
  );
};

export default NavbarItem;
