import React from "react";
import { cn } from "@/lib/utils";

interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Divider = ({ className, ...rest }: DividerProps) => {
  return <div className={cn("my-6 border-b", className)} {...rest}></div>;
};

export default Divider;
