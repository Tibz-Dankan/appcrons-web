import React, { Fragment, useState } from "react";

interface InputTextAreaProps extends React.HTMLAttributes<HTMLTextAreaElement> {
  formik?: any;
  name: string;
  placeholder?: string;
}

export const InputTextArea: React.FC<InputTextAreaProps> = (props) => {
  const formik = props.formik;
  const name = props.name;
  const placeholder = props.placeholder ? props.placeholder : "";

  return (
    <Fragment>
      <div
        className="relative pt-6 flex flex-col items-start 
         justify-center gap-1 w-full text-color-text-primary"
      >
        {formik.errors[`${name}`] && formik.touched[`${name}`] && (
          <p className="absolute top-0 left-0 text-sm text-red-500 first-letter:uppercase">
            {formik.errors[`${name}`]}
          </p>
        )}
        <div className="w-full relative">
          <textarea
            id={name}
            required
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values[`${name}`]}
            placeholder={placeholder}
            className="p-2 outline-none rounded-md border-[1px]
            border-color-border-primary focus:border-[1px] focus:border-primary
            transition-all text-sm w-full h-28 focus:outline-none
            focus:shadow-[0px_0px_0px_4px_rgba(12,166,120,0.3)]
            text-color-text-primary bg-color-bg-primary"
          />
        </div>
      </div>
    </Fragment>
  );
};
