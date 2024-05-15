// "use client";
// import { useNotificationStore } from "@/store/notification";
// import React, { ReactNode } from "react";

// interface NotificationProvider {
//   children: ReactNode;
// }

// const NotificationProvider: React.FC<NotificationProvider> = (props) => {
//   const notification = useNotificationStore((state) => state.notification);
//   //   const hideNotificationHandler = ()=>{
//   //     const {hideCardNotification}=useNotificationStore()
//   //     hideCardNotification()
//   //   }

//   return (
//     <div>
//       {notification.showCardNotification && <div>{props.children}</div>}
//     </div>
//   );
// };

// export default NotificationProvider;
