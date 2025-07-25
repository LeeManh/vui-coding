import React from "react";
import { Input } from "../Input";
import { Button } from "../Button";
import { cn } from "@/lib/utils";

interface SubscribeFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const SubscribeForm = ({ className, ...rest }: SubscribeFormProps) => {
  return (
    <div
      className={cn(
        "flex w-full items-center border border-button-primary rounded-sm overflow-hidden",
        className
      )}
      {...rest}
    >
      <Input
        type="email"
        placeholder="Type your email"
        className="border-none outline-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none font-light"
      />
      <Button className="rounded-none border-none outline-0 px-4">Subscribe</Button>
    </div>
  );
};

export default SubscribeForm;
