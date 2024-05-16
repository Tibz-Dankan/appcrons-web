// "use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers";
import { Notification } from "@/shared/notification";
// import { useNotificationStore } from "@/store/notification";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { hideCardNotification } from "@/store/actions/notification";
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
  // // const notification = useNotificationStore((state) => state.notification);
  // const dispatch = useAppDispatch();
  // const hideNotificationHandler = () => {
  //   // const { hideCardNotification } = useNotificationStore();
  //   dispatch(hideCardNotification());
  // };

  // const notification = useAppSelector((state) => state.notification);

  return (
    <Providers>
      {/* // <html lang="en" data-theme="dark">
    // TODO: add dynamic changing of themes */}
      <html lang="en">
        <body className={inter.className}>
          {/* {notification.showCardNotification && (
            <div>
              <Notification
                type={notification.cardNotificationType}
                message={notification.cardMessage}
                onClose={hideNotificationHandler}
              />
            </div>
          )} */}
          <NotificationInitializer />
          {children}
        </body>
      </html>
    </Providers>
  );
}
