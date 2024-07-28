import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
}

export const Card: React.FC<CardProps> = (props) => {
  return (
    <div
      className={twMerge(
        "w-full h-auto rounded-md p-4 bg-color-bg-secondary shadow",
        props.className
      )}
    >
      {props.children}
    </div>
  );
};
