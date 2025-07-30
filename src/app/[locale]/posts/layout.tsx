import MainLayout from "@/components/layouts/MainLayout";

export default function PostsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MainLayout showNavbar={false}>{children}</MainLayout>;
}
