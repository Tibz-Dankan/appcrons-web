import React, { Fragment, useState } from "react";
import { IconContext } from "react-icons";
import { PiEyeLight, PiEyeSlashLight } from "react-icons/pi";

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
        className="relative pt-4 flex flex-col items-start 
         justify-center gap-1 w-full text-gray-800s"
      >
        {formik.errors[`${name}`] && formik.touched[`${name}`] && (
          <p className="absolute top-0 left-0 text-sm text-red-600">
            {formik.errors[`${name}`]}
          </p>
        )}
        <div className="w-full relative">
          {/* To add styling for the for the input element */}
          <input
            type={getFieldType()}
            id={name}
            required
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values[`${name}`]}
            placeholder={placeholder}
            className="input input-bordered w-full max-w-xs"
          />

          {isPasswordField && (
            <div className="inline-block absolute right-2 top-[7px]">
              {!showPassword && (
                <span
                  className="cursor-pointer"
                  onClick={() => showPasswordHandler()}
                >
                  <IconContext.Provider
                    value={{
                      size: "1.4rem",
                      color: "#495057",
                    }}
                  >
                    <PiEyeLight />
                  </IconContext.Provider>
                </span>
              )}
              {showPassword && (
                <span
                  className="cursor-pointer"
                  onClick={() => showPasswordHandler()}
                >
                  <IconContext.Provider
                    value={{
                      size: "1.4rem",
                      color: "#495057",
                    }}
                  >
                    <PiEyeSlashLight />
                  </IconContext.Provider>
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};
