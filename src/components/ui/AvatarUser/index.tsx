import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../Avatar";
import { cn } from "@/lib/utils";
import { AvatarProps } from "@radix-ui/react-avatar";

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
