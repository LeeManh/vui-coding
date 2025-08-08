import React from "react";
import { MainHeader } from "@/components/layouts/header";
import { Footer } from "@/components/layouts/footer";
import { Navbar } from "./navbar";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  children: React.ReactNode;
  showNavbar?: boolean;
  showHeader?: boolean;
  showFooter?: boolean;
}

const MainLayout = (props: MainLayoutProps) => {
  const { children, showNavbar = true, showHeader = true, showFooter = true } = props;

  return (
    <div className="min-h-screen flex flex-col">
      {showHeader && <MainHeader />}
      {showNavbar && <Navbar />}

      <main className={cn("py-6 flex-1")}>
        <div className="app-container">{children}</div>
      </main>

      {showFooter && <Footer />}
    </div>
  );
};

export default MainLayout;
