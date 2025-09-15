import React from "react";
import { twMerge } from "tailwind-merge";

interface RequestIconProps {
  className?: string;
}

export const RequestIcon: React.FC<RequestIconProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={twMerge(`text-color-text-primary`, props.className)}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="1.5"
        d="M18 16v-5.6A4.4 4.4 0 0 0 13.6 6H11m7 10a2 2 0 1 0 0 4a2 2 0 0 0 0-4M11 6l2-2m-2 2l2 2m-7 8a2 2 0 1 0 0 4a2 2 0 0 0 0-4m0 0V8m0 0a2 2 0 1 0 0-4a2 2 0 0 0 0 4"
      />
    </svg>
  );
};
