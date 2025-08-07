import React from "react";
import { Badge, BadgeProps } from "../Badge";
import { cn } from "@/lib/utils";

interface TagBadgeProps extends BadgeProps {
  children: React.ReactNode;
}

const TagBadge = ({ children, className, ...props }: TagBadgeProps) => {
  return (
    <Badge
      variant="secondary"
      className={cn("text-xs text-muted-foreground font-normal", className)}
      {...props}
    >
      {children}
    </Badge>
  );
};

export default TagBadge;
