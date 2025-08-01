"use client";

import Link from "next/link";
import React from "react";

interface ProfileCardProps {
  href: string;
  title: string;
  icon: React.ReactNode;
}

const ProfileCard = ({ href, title, icon }: ProfileCardProps) => {
  return (
    <Link href={href}>
      <div className="border rounded-lg p-4 text-center space-y-4 hover:translate-y-[-5px] transition-all duration-300 cursor-pointer">
        <div className="bg-gray-300 rounded-full p-2 w-12 h-12 flex items-center justify-center mx-auto">
          {icon}
        </div>
        <div>{title}</div>
      </div>
    </Link>
  );
};

export default ProfileCard;
