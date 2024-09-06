"use client";

import React, { Fragment, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { Spinner } from "@/app/shared/loader/Spinner";
import { InputField } from "@/app/shared/InputField";
import Button from "@/app/shared/Button";
import { TSigninInPut } from "@/types/auth";
import { AuthService } from "@/services/auth.service";
import { Link } from "@/lib/router-events";
import { useAppDispatch } from "@/hooks/redux";
import {
  hideCardNotification,
  showCardNotification,
} from "@/store/actions/notification";
import { useRouter } from "@/lib/router-events";
import { Logo } from "@/app/shared/Logo";

export const LogIn: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState<boolean>(false);

  const { isPending, mutate } = useMutation({
    mutationFn: new AuthService().signIn,
    onSuccess: async (auth: any) => {
      setIsRedirecting(() => true);
      await new AuthService().authenticateClient(auth.accessToken, auth.user);
      setIsRedirecting(() => false);
      router.push("/dashboard");
    },
    onError: (error: any) => {
      setIsRedirecting(() => false);
      dispatch(showCardNotification({ type: "error", message: error.message }));
      setTimeout(() => {
        dispatch(hideCardNotification());
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

  const showDefaultBtnLabel = !isPending && !isRedirecting;

  return (
    <Fragment>
      <div
        className="flex flex-col items-center justify-center gap-4
         min-h-[100vh] py-16"
      >
        <div className="w-full flex flex-col items-center gap-8">
          <Link href="/">
            <Logo />
          </Link>
          <p className="text-center text-2xl">Log in to Appcrons</p>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-0 items-center w-[90%] sm:w-96
          border-[1px]  border-color-border-primary p-8
          bg-color-bg-secondary rounded-md z-[1]"
        >
          <InputField
            type="email"
            label="Email"
            name="email"
            placeholder="Your email address"
            formik={formik}
          />
          <InputField
            type="password"
            label="Password"
            name="password"
            placeholder="Your password"
            formik={formik}
          />
          <Button
            label={
              <>
                {showDefaultBtnLabel && <span>Log in</span>}
                {isPending && !isRedirecting && (
                  <Spinner
                    label="Logging in"
                    className="w-5 h-5 text-gray-100"
                  />
                )}
                {isRedirecting && (
                  <Spinner
                    label="Redirecting"
                    className="w-5 h-5 text-gray-100"
                  />
                )}
              </>
            }
            type="submit"
            disabled={isPending || isRedirecting}
            className="w-full mt-6 font-semibold"
          />
          <div className="w-full mt-4 space-y-4s flex justify-between gap-4">
            <p
              className="text-center text-color-text-primary hover:underline
              hover:text-blue-500 cursor-pointer"
            >
              <Link href="/auth/forgot-password" className="">
                Forgot password?
              </Link>
            </p>
            <p
              className="hover:underline hover:text-blue-500 
              cursor-pointer text-color-text-primary"
            >
              <Link href="/auth/signup">Create account</Link>
            </p>
          </div>
        </form>
        {/* Footer here */}
      </div>
    </Fragment>
  );
};
