import { cn } from "@/lib/utils";
import React from "react";

interface TitleSectionProps extends React.HTMLAttributes<HTMLDivElement> {}

export const TitleSection = ({ title, className, ...rest }: TitleSectionProps) => {
  return (
    <div className={cn("flex items-baseline justify-between gap-2", className)} {...rest}>
      <div className="uppercase text-sm hover:underline hover:text-blue-300 cursor-pointer">
        {title}
      </div>
      <div className="border-b flex-1 h-[1px]"></div>
    </div>
  );
};
