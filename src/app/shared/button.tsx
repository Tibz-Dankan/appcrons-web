import React, { Fragment, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  className?: string;
  label: ReactNode;
  type: "submit" | "reset" | "button";
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <Fragment>
      <button
        className={twMerge(
          `btns btn-actives btn-primarys 
          flex items-center justify-center bg-primary h-10 
          py-2 px-4 rounded-md text-gray-300`,
          props.className
        )}
        type={props.type}
        onClick={props.onClick}
      >
        {props.label}
      </button>
    </Fragment>
  );
};

export default Button;
