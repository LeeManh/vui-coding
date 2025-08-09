import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";

const spinnerVariants = cva("", {
  variants: {
    variant: {
      default: "animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent",
    },
    size: {
      default: "h-8 w-8",
      sm: "h-6 w-6",
      xs: "h-4 w-4",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

interface SpinnerProps extends React.ComponentProps<"div">, VariantProps<typeof spinnerVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

const Spinner = ({ className, variant, size, ...props }: SpinnerProps) => {
  return <div className={cn(spinnerVariants({ variant, size }), className)} {...props}></div>;
};

export default Spinner;
