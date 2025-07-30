import MainLayout from "@/components/layouts/MainLayout";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MainLayout showHeader={false} showNavbar={false} showFooter={false}>
      <div className="flex items-center justify-center h-screen">{children}</div>
    </MainLayout>
  );
}
