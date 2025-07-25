import React from "react";
import { Avatar, AvatarFallback, AvatarImage, AvatarProps } from "../Avatar";
import { cn } from "@/lib/utils";

interface AvatarUserProps extends AvatarProps {
  avatar?: string | null;
  username?: string;
}

const AvatarUser = ({ avatar, username, className, ...props }: AvatarUserProps) => {
  return (
    <Avatar className={cn(className)} {...props}>
      <AvatarImage src={avatar || ""} alt={username} className="object-cover" />
      <AvatarFallback className="text-black">{username?.charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
};

export default AvatarUser;
