import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers";
import NotificationInitializer from "@/app/shared/notificationInitializer";
import { AppLayout } from "@/app/layouts/appLayout";
import { ThemeAppProvider } from "@/providers/themeProvider";

// const inter = Inter({ subsets: ["latin"] });

import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

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
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <ThemeAppProvider>
            <NotificationInitializer />
            <AppLayout>{children}</AppLayout>
          </ThemeAppProvider>
        </body>
      </html>
    </Providers>
  );
}
