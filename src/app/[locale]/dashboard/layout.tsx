import { SidebarProvider, SidebarTrigger } from "@/components/shared/Sidebar";
import { ROUTE_PATHS } from "@/constants/route-paths";
import Link from "next/link";
import { Button } from "@/components/shared/Button";
import { Home } from "lucide-react";
import { DashBoardSidebar } from "@/components/dashboard/DashBoardSideBar";

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <DashBoardSidebar />

      <section className="w-full">
        <div className="w-full h-12 flex items-center px-4 border-b border-gray-200/60 dark:border-gray-800/60">
          <div className="flex items-center space-x-3">
            <SidebarTrigger />
            <Link href={ROUTE_PATHS.HOME}>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground"
              >
                <Home className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="p-4">{children}</div>
      </section>
    </SidebarProvider>
  );
}
