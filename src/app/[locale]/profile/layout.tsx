import { SidebarProvider, SidebarTrigger } from "@/components/shared/Sidebar";
import { ProfileSidebar } from "@/components/profile/profile-sidebar";
import { ROUTE_PATHS } from "@/constants/route-paths";
import Link from "next/link";
import { Button } from "@/components/shared/Button";
import { Home } from "lucide-react";

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <ProfileSidebar />

      <section className="w-full">
        <div className="w-full h-14 flex items-center p-4 border-b divide-x">
          <div className="pr-3">
            <SidebarTrigger />
          </div>

          <Link href={ROUTE_PATHS.HOME} className="px-3">
            <Button variant="ghost" size="icon" className="size-7">
              <Home className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="p-6">{children}</div>
      </section>
    </SidebarProvider>
  );
}
