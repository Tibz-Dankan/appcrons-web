import React from "react";
import { twMerge } from "tailwind-merge";
interface ArrowBackIconProps {
  className?: string;
}

export const ArrowBackIcon: React.FC<ArrowBackIconProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20px"
      height="20px"
      viewBox="0 0 24 24"
      className={twMerge(`text-color-text-primary`, props.className)}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 12h14M5 12l4-4m-4 4l4 4"
      />
    </svg>
  );
};
