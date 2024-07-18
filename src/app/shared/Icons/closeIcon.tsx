import React from "react";
import { twMerge } from "tailwind-merge";

interface CloseIconProps {
  className?: string;
}

export const CloseIcon: React.FC<CloseIconProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20px"
      height="20px"
      viewBox="0 0 32 32"
      className={twMerge(`text-color-text-primary`, props.className)}
    >
      <path
        fill="currentColor"
        d="M17.414 16L24 9.414L22.586 8L16 14.586L9.414 8L8 9.414L14.586 16L8 22.586L9.414 24L16 17.414L22.586 24L24 22.586z"
      />
    </svg>
  );
};
