import { SidebarProvider, SidebarTrigger } from "@/components/ui/Sidebar";
import AppSidebar from "@/components/ui/AppSidebar";

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />
      {children}
    </SidebarProvider>
  );
}
