import React from "react";
import { twMerge } from "tailwind-merge";

interface TwitterIconProps {
  className?: string;
}

// export const TwitterIcon: React.FC<TwitterIconProps> = (props) => {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width="0.88em"
//       height="1em"
//       viewBox="0 0 448 512"
//       className={twMerge("", props.className)}
//     >
//       <path
//         fill="currentColor"
//         d="M64 32C28.7 32 0 60.7 0 96v320c0 35.3 28.7 64 64 64h320c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64zm297.1 84L257.3 234.6L379.4 396h-95.6L209 298.1L123.3 396H75.8l111-126.9L69.7 116h98l67.7 89.5l78.2-89.5zm-37.8 251.6L153.4 142.9h-28.3l171.8 224.7h26.3z"
//       />
//     </svg>
//   );
// };
export const TwitterIcon: React.FC<TwitterIconProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
      className={twMerge("", props.className)}
    >
      <path
        fill="currentColor"
        d="M9.294 6.928L14.357 1h-1.2L8.762 6.147L5.25 1H1.2l5.31 7.784L1.2 15h1.2l4.642-5.436L10.751 15h4.05zM7.651 8.852l-.538-.775L2.832 1.91h1.843l3.454 4.977l.538.775l4.491 6.47h-1.843z"
      />
    </svg>
  );
};
