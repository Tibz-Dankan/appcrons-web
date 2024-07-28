import React, { Fragment } from "react";
import { twMerge } from "tailwind-merge";

interface SpinnerProps {
  className?: string;
  label?: string;
}

export const Spinner: React.FC<SpinnerProps> = (props) => {
  const rectangleStyles = [
    { opacity: ".14" },
    { opacity: ".29", rotateX: "30" },
    { opacity: ".43", rotateX: "60" },
    { opacity: ".57", rotateX: "90" },
    { opacity: ".71", rotateX: "120" },
    { opacity: ".86", rotateX: "150" },
    { rotateX: "180" },
  ];
  return (
    <Fragment>
      <div className="flex items-center justify-start gap-x-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          className={twMerge("text-gray-600", props.className)}
        >
          <g>
            {rectangleStyles.map((style, index) => {
              if (index === 0)
                return (
                  <rect
                    key={index}
                    width="2"
                    height="6"
                    x="11"
                    y="1"
                    fill="currentColor"
                    opacity={style.opacity}
                  />
                );
              if (index === rectangleStyles.length)
                return (
                  <rect
                    key={index}
                    width="2"
                    height="6"
                    x="11"
                    y="1"
                    fill="currentColor"
                    transform={`rotate(${style.rotateX} 12 12)`}
                  />
                );
              return (
                <rect
                  key={index}
                  width="2"
                  height="6"
                  x="11"
                  y="1"
                  fill="currentColor"
                  opacity={`${style.opacity}`}
                  transform={`rotate(${style.rotateX} 12 12)`}
                />
              );
            })}
            <animateTransform
              attributeName="transform"
              calcMode="discrete"
              dur="0.75s"
              repeatCount="indefinite"
              type="rotate"
              values="0 12 12;30 12 12;60 12 12;90 12 12;120 12 12;150 12 12;180 12 12;210 12 12;240 12 12;270 12 12;300 12 12;330 12 12;360 12 12"
            />
          </g>
        </svg>
        <span>{props?.label && props.label + "..."}</span>
      </div>
    </Fragment>
  );
};
