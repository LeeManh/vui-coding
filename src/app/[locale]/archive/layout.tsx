import MainLayout from "@/components/layouts/MainLayout";

export default function ArchiveLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MainLayout containerType="sm">{children}</MainLayout>;
}
