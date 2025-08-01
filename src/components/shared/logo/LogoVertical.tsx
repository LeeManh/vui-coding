import React from "react";
import Link from "next/link";
import { Bug } from "lucide-react";
import { ROUTE_PATHS } from "@/constants/route-paths";

export const LogoVertical = () => {
  return (
    <Link
      href={ROUTE_PATHS.HOME}
      className="flex items-center gap-2 bg-secondary-foreground px-2 py-1"
    >
      <Bug color="red" className="w-6 h-6" />
      <span className="font-bold  text-lg text-secondary">vui.coding</span>
    </Link>
  );
};
