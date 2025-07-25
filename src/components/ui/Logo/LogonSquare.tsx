import React from "react";
import Link from "next/link";

const LogoSquare = () => {
  return (
    <Link
      href="/"
      className="flex items-center justify-center flex-col rounded-xs w-11 h-11 bg-secondary-foreground"
    >
      <span className="text-[9px] font-bold  text-secondary">vui</span>
      <span className="text-[9px] font-bold  text-secondary">coding</span>
    </Link>
  );
};

export default LogoSquare;
