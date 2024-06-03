import React, { Fragment } from "react";
import { TriangleDownIcon } from "@/app/shared/Icons/triangleDownIcon";

interface InputSelectProps extends React.HTMLAttributes<HTMLSelectElement> {
  formik?: any;
  label?: string;
  options: string[];
}

export const InputSelect: React.FC<InputSelectProps> = (props) => {
  const formik = props.formik;
  const options = props.options;
  const label = props.label;

  return (
    <Fragment>
      <div
        className="relative pt-6 flex flex-col items-start 
         justify-center gap-1 w-full text-color-text-primary"
      >
        {formik.errors[`${label}`] && formik.touched[`${label}`] && (
          <p className="absolute top-0 left-0 text-sm text-red-500 first-letter:uppercase">
            {formik.errors[`${label}`]}
          </p>
        )}
        <div className="w-full relative">
          <select
            onChange={formik.handleChange}
            value={formik.values[`${label}`]}
            id={label}
            className="appearance-none p-2 outline-none rounded-md border-[1px]
            border-color-border-primary focus:border-[1px] focus:border-primary
            transition-all text-sm w-full focus:outline-none
            focus:shadow-[0px_0px_0px_4px_rgba(12,166,120,0.3)]
            text-color-text-primary bg-color-bg-primary"
          >
            {options.map((option) => (
              <option value={option}>{option}</option>
            ))}
          </select>
          <div
            className="flex items-center justify-center absolute top-0 
             right-2 h-full"
          >
            <TriangleDownIcon className="w-3 h-3" />
          </div>
        </div>
      </div>
    </Fragment>
  );
};
