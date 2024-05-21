import React, { Fragment } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  className?: string;
  label: string;
  type: "submit" | "reset" | "button";
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <Fragment>
      <button
        className={twMerge("btn btn-active btn-primary", props.className)}
        type={props.type}
        onClick={props.onClick}
      >
        {props.label}
      </button>
    </Fragment>
  );
};

export default Button;
