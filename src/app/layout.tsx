import type { Metadata } from "next";
import ClientWrapper from "@/components/wrap/ClientWrapper.comp";
import "./globals.css";

export const metadata: Metadata = {
  title: "vui.coding",
  description: "Code for fun",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
