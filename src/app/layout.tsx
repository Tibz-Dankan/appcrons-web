import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers";
import NotificationInitializer from "@/shared/notificationInitializer";

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
    <Providers>
      {/* // <html lang="en" data-theme="dark">
    // TODO: add dynamic changing of themes */}
      <html lang="en">
        <body className={inter.className}>
          <NotificationInitializer />
          {children}
        </body>
      </html>
    </Providers>
  );
}
