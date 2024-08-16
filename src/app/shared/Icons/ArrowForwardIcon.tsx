import React from "react";
import { twMerge } from "tailwind-merge";
interface ArrowForwardIconProps {
  className?: string;
}

export const ArrowForwardIcon: React.FC<ArrowForwardIconProps> = (props) => {
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
        d="M19 12H5m14 0l-4 4m4-4l-4-4"
      />
    </svg>
  );
};
