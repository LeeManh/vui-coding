import React from "react";
import { MainHeader } from "@/components/layouts/header";
import { Navbar } from "@/components/layouts/navbar";
import { Footer } from "@/components/layouts/footer";
import { cn } from "@/lib/utils";

type ContainerType = "default" | "sm";

interface MainLayoutProps {
  children: React.ReactNode;
  showNavbar?: boolean;
  showHeader?: boolean;
  containerType?: ContainerType;
  showFooter?: boolean;
}

const containers: Record<ContainerType, string> = {
  default: "app-container",
  sm: "app-container-sm",
};

const MainLayout = (props: MainLayoutProps) => {
  const {
    children,
    showNavbar = true,
    showHeader = true,
    containerType = "default",
    showFooter = true,
  } = props;

  return (
    <div>
      {showHeader && <MainHeader />}
      {showNavbar && <Navbar />}

      <div className={cn(containers[containerType])}>{children}</div>

      {showFooter && <Footer />}
    </div>
  );
};

export default MainLayout;
