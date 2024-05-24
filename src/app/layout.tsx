import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers";
import NotificationInitializer from "@/app/shared/notificationInitializer";
import { AppLayout } from "@/app/layouts/appLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Keep Active",
  description: "Keep Active default page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // TODO: add dynamic changing of themes
    <Providers>
      {/* <html lang="en" data-theme="dark"> */}
      <html lang="en">
        <body className={inter.className}>
          <NotificationInitializer />
          <AppLayout>{children}</AppLayout>
        </body>
      </html>
    </Providers>
  );
}
