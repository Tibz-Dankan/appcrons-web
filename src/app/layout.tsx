import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers";
import NotificationInitializer from "@/app/shared/notificationInitializer";
import { AppLayout } from "@/app/layouts/appLayout";
import { ThemeAppProvider } from "@/providers/themeProvider";
import { PHProvider } from "@/providers/postHog";
import dynamic from "next/dynamic";
import { OnPageLoadComplete } from "@/lib/router-events";
import "react-tooltip/dist/react-tooltip.css";

const PostHogPageView = dynamic(() => import("@/app/PostHogPageView"), {
  ssr: false,
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "Appcrons: Lets you optimize uptime for your free backend instance on Render",
  description: "Optimize uptime for your free backend instance on Render",
  openGraph: {
    type: "website",
    url: "https://www.appcrons.com/",
    title: "Appcrons - Keep Your Backend Servers Awake",
    description:
      "Appcrons prevents your backend servers hosted on render.com's free/hobby plan from shutting down due to inactivity. Keep your servers awake with periodic requests.",
    images: [
      {
        url: "https://www.appcrons.com/images/og-image.png",
        width: 800,
        height: 600,
        alt: "Appcrons",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en" suppressHydrationWarning>
        <PHProvider>
          <body className={inter.className}>
            <OnPageLoadComplete />
            <PostHogPageView />
            <ThemeAppProvider>
              <NotificationInitializer />
              <AppLayout>{children}</AppLayout>
            </ThemeAppProvider>
          </body>
        </PHProvider>
      </html>
    </Providers>
  );
}
