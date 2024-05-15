"use client";

import React, { Fragment } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { Spinner } from "@/shared/loader/spinner";
import { InputField } from "@/shared/inputField";
import Button from "@/shared/button";
import { TSigninInPut } from "@/types/auth";
import { useNotificationStore } from "@/store/notification";
import { AuthService } from "@/services/auth.service";
import Link from "next/link";

const Login: React.FC = () => {
  const { showCardNotification, hideCardNotification } = useNotificationStore();

  const { isPending, mutate } = useMutation({
    mutationFn: new AuthService().signIn,
    onSuccess: (auth: any) => {
      console.log("Log in successful");
    },
    onError: (error: any) => {
      showCardNotification({ type: "error", message: error.message });
      console.log("Error: ", error.message);
      setTimeout(() => {
        hideCardNotification();
      }, 5000);
    },
  });

  const initialValues: TSigninInPut = {
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      email: Yup.string().max(255).required("email is required"),
      password: Yup.string()
        .max(255)
        .min(5)
        .max(30)
        .required("password is required"),
    }),

    onSubmit: async (values, helpers) => {
      try {
        mutate(values);
      } catch (err: any) {
        helpers.setStatus({ success: false });
        helpers.setSubmitting(false);
        showCardNotification({ type: "error", message: err.message });
        setTimeout(() => {
          hideCardNotification();
        }, 5000);
      }
    },
  });

  return (
    <Fragment>
      <div
        className="min-h-screen grid place-items-center py-28
         relative bg-gray-200"
      >
        <div
          className="bg-blue-100 w-[100vw] h-[60vh] 
          absolute top-0 left-0 right-0 rounded-b-[60%] z-0"
        />

        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-0 items-center w-[90%] sm:w-[480px]
          bg-gray-50 shadow-md p-8 rounded-md z-[1]"
        >
          <Link href="/">
            <img src="/logo/png" alt="logo" className="w-28" />
          </Link>
          <p className="text-center text-2xl font-semibold">Log in</p>
          <InputField type="email" name="email" formik={formik} />
          <InputField type="password" name="password" formik={formik} />
          {!isPending && (
            <Button
              label="Log in"
              type="submit"
              aria-disabled={isPending}
              className="mt-6 font-semibold"
            />
          )}
          {isPending && (
            <div className="py-[6px] font-semibold text-gray-100">
              <Spinner label="Logging in" className="w-5 h-5 text-gray-100" />
            </div>
          )}
          <div className="mt-4 space-y-4">
            <p className="text-center hover:underline hover:text-blue-500 cursor-pointer">
              <Link href="/auth/forgot-password">Forgot password</Link>
            </p>
            <p className="hover:underline hover:text-blue-500 cursor-pointer">
              <Link href="/auth/signup" className="underline">
                Create account
              </Link>
            </p>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default Login;
