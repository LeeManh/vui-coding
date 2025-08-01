import { SidebarProvider, SidebarTrigger } from "@/components/ui/Sidebar";
import { ProfileSidebar } from "@/components/ui/Sidebar/ProfileSidebar";

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <ProfileSidebar />

      <section className="w-full">
        <div className="w-full h-14 flex items-center p-4 border-b">
          <SidebarTrigger className="-ml-2" />
        </div>

        <div className="p-4">{children}</div>
      </section>
    </SidebarProvider>
  );
}
