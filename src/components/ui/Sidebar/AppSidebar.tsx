import React from "react";
import SubscribeForm from "../SubscribeForm";
import LogoSquare from "../Logo/LogonSquare";

const AppSidebar = () => {
  return (
    <div>
      <div className="space-y-1">
        <LogoSquare />
        <p className="text-foreground font-medium">vui.coding</p>
        <p className=" text-xs leading-5">
          Welcome to vui.coding, your one-stop shop for mastering Backend, Cloud, Kubernetes,
          Microservices, APIs, and more. We&apos;ll provide you with hands-on, practical and
          real-world tutorials that you can use to build your software development skills.
        </p>
      </div>

      <SubscribeForm className="mt-4" />

      <div className="mt-8">
        <div className="border-b  pb-2 flex items-center justify-between">
          <div className="text-foreground font-medium">Recommendations</div>
          <div className="text-foreground text-xs leading-5 hover:underline duration-300 cursor-pointer underline-offset-2 font-light">
            VIEW ALL
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppSidebar;
