import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers/Index";
import NotificationInitializer from "@/app/shared/NotificationInitializer";
import { ThemeAppProvider } from "@/providers/ThemeProvider";
import { PHProvider } from "@/providers/PostHog";
import dynamic from "next/dynamic";
import { OnPageLoadComplete } from "@/lib/router-events";
import "react-tooltip/dist/react-tooltip.css";

const PostHogPageView = dynamic(() => import("@/app/PostHogPageView"), {
  ssr: false,
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Appcrons - Optimize uptime for your free backend instance on Render",
  description: "Optimize uptime for your free backend instance on Render",
  // openGraph: {
  //   type: "website",
  //   url: "https://appcrons.netlify.app/",
  //   title: "Appcrons - Keep Your Backend Servers Awake",
  //   description:
  //     "Appcrons prevents your backend servers hosted on render.com's free/hobby plan from shutting down due to inactivity. Keep your servers awake with periodic requests.",
  //   images: [
  //     {
  //       url: "/logo.png",
  //       width: 800,
  //       height: 600,
  //       alt: "Appcrons",
  //     },
  //   ],
  // },
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
              {children}
            </ThemeAppProvider>
          </body>
        </PHProvider>
      </html>
    </Providers>
  );
}
