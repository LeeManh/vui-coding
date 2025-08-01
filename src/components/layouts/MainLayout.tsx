import { MainHeader } from "@/components/ui/Header";
import React from "react";
import Navbar from "@/components/ui/Navbar";
import { cn } from "@/lib/utils";
import Footer from "../ui/Footer/Footer";

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

      <div className={cn(containers[containerType], "py-6")}>{children}</div>

      {showFooter && <Footer />}
    </div>
  );
};

export default MainLayout;
