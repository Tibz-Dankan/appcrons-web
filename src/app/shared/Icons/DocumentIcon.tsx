import React from "react";
import { twMerge } from "tailwind-merge";

interface DocumentIconProps {
  className?: string;
}

export const DocumentIcon: React.FC<DocumentIconProps> = (props) => {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="20px"
        width="20px"
        viewBox="0 0 512 512"
        className={twMerge(`text-color-text-primary`, props.className)}
      >
        <path
          fill="none"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="32"
          d="M416 221.25V416a48 48 0 0 1-48 48H144a48 48 0 0 1-48-48V96a48 48 0 0 1 48-48h98.75a32 32 0 0 1 22.62 9.37l141.26 141.26a32 32 0 0 1 9.37 22.62Z"
        />
        <path
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="32"
          d="M256 56v120a32 32 0 0 0 32 32h120m-232 80h160m-160 80h160"
        />
      </svg>
    </div>
  );
};
