import React, { Fragment, useState } from "react";
import { EyeIcon } from "@/app/shared/Icons/EyeIcon";
import { EyeSlashIcon } from "@/app/shared/Icons/EyeSlashIcon";

interface InputFieldProps extends React.HTMLAttributes<HTMLInputElement> {
  formik?: any;
  name: string;
  type: "text" | "password" | "email" | "number" | "date" | "time";
  placeholder?: string;
}

export const InputField: React.FC<InputFieldProps> = (props) => {
  const formik = props.formik;
  const name = props.name;
  const placeholder = props.placeholder ? props.placeholder : "";

  const isPasswordField: boolean = props.type === "password";
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const showPasswordHandler = () => setShowPassword(() => !showPassword);

  const getFieldType = (): string => {
    if (isPasswordField && showPassword) return "text";
    return props.type;
  };

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
          <input
            type={getFieldType()}
            id={name}
            required
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values[`${name}`]}
            placeholder={placeholder}
            className="p-2 outline-none rounded-md border-[1px]
            border-color-border-primary focus:border-[1px] focus:border-primary
            transition-all text-sm w-full focus:outline-none
            focus:shadow-[0px_0px_0px_4px_rgba(12,166,120,0.3)]
            text-color-text-primary bg-color-bg-primary"
          />

          {isPasswordField && (
            <div className="inline-block absolute right-2 top-[7px]">
              {!showPassword && (
                <span
                  className="cursor-pointer"
                  onClick={() => showPasswordHandler()}
                >
                  <EyeIcon className="text-[#868e96]" />
                </span>
              )}
              {showPassword && <EyeSlashIcon className="text-[#868e96]" />}
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};
