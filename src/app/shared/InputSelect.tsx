import React, { Fragment, useEffect, useState } from "react";
import { TriangleDownIcon } from "@/app/shared/Icons/TriangleDownIcon";
import { ErrorIconFilled } from "@/app/shared/Icons/ErrorFilledIcon";

interface InputSelectProps extends React.HTMLAttributes<HTMLSelectElement> {
  formik?: any;
  name?: string;
  options: string[];
  defaultOption?: string;
  label?: string;
}

export const InputSelect: React.FC<InputSelectProps> = (props) => {
  const formik = props.formik;
  const options = props.options;
  const hasDefaultOption: boolean = !!props.defaultOption;
  const defaultOption = hasDefaultOption ? props.defaultOption : "";
  const name = props.name;
  const label = props.label ? props.label : "";
  const hasSelectedValue: boolean = !!formik.values[`${name}`];

  const hasError = formik.errors[`${name}`] && formik.touched[`${name}`];

  useEffect(() => {
    const setDefaultValueHandler = () => {
      if (hasSelectedValue) return;

      if (hasDefaultOption) {
        formik.values[`${name}`] = defaultOption!;
        return;
      }
      formik.values[`${name}`] = options[0];
    };

    setDefaultValueHandler();

    return () => {
      // const inputSelectCleanUp = () => {
      //   formik.values[`${name}`] = "";
      //   formik.errors[`${name}`] = "";
      // };
      // inputSelectCleanUp();
    };
  }, [hasSelectedValue, defaultOption]);

  return (
    <Fragment>
      <div
        className="relative pb-5 flex flex-col items-start 
         justify-center gap-1 w-full text-color-text-primary"
      >
        {label && (
          <label
            className={`text-sm first-letter:uppercase font-[400] mb-1
            text-color-text-secondary`}
          >
            {label}
          </label>
        )}
        <div className="w-full relative">
          <select
            onChange={formik.handleChange}
            value={formik.values[`${name}`]}
            id={name}
            className="appearance-none p-2 outline-none rounded-md border-[1px]
            border-color-border-primary focus:border-[1px] focus:border-primary
            transition-all text-sm w-full focus:outline-none
            focus:shadow-[0px_0px_0px_4px_rgba(12,166,120,0.3)]
            text-color-text-primary bg-color-bg-primary"
          >
            {options.map((option, index) => (
              <option value={option} key={index}>
                {option}
              </option>
            ))}
          </select>
          <div
            className="flex items-center justify-center absolute top-0 
             right-2 h-full"
          >
            <TriangleDownIcon className="w-3 h-3" />
          </div>
        </div>
        {hasError && (
          <p
            className="absolute bottom-0 left-0 text-sms text-red-500
             first-letter:uppercase text-[12px] flex items-center gap-1"
          >
            <ErrorIconFilled className="text-inherit w-4 h-4" />
            <span> {formik.errors[`${name}`]}</span>
          </p>
        )}
      </div>
    </Fragment>
  );
};
