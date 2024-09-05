"use client";

import React, { Fragment, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { Spinner } from "@/app/shared/loader/Spinner";
import { InputField } from "@/app/shared/InputField";
import Button from "@/app/shared/Button";
import { TSignupInput } from "@/types/auth";
import { AuthService } from "@/services/auth.service";
import { Link } from "@/lib/router-events";
import { useAppDispatch } from "@/hooks/redux";
import {
  hideCardNotification,
  showCardNotification,
} from "@/store/actions/notification";
// import Image from "next/image";
import { useRouter } from "@/lib/router-events";
import { authenticate } from "@/store/actions/auth";
import { Logo } from "@/app/shared/Logo";

export const SignUp: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState<boolean>(false);

  const { isPending, mutate } = useMutation({
    mutationFn: new AuthService().signUp,
    onSuccess: async (auth: any) => {
      dispatch(
        showCardNotification({ type: "success", message: auth.message })
      );
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);

      setIsRedirecting(() => true);
      await authenticate(auth.accessToken, auth.user);
      setTimeout(() => {
        setIsRedirecting(() => false);
        router.push("/dashboard");
      }, 5000);

      // setTimeout(() => {
      //   window.location.reload();
      // }, 7000);
    },
    onError: (error: any) => {
      setIsRedirecting(() => false);
      dispatch(showCardNotification({ type: "error", message: error.message }));
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    },
  });

  const initialValues: TSignupInput = {
    name: "",
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      name: Yup.string().max(255).required("username is required"),
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
            {/* <Image src="/logo.png" width={80} height={80} alt="logo" /> */}
            <Logo />
          </Link>
          <p className="text-center flex flex-col">
            <span className="text-2xl">Welcome to Appcrons</span>
            <span className="text-color-text-secondary">
              Let's create your account
            </span>
          </p>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-0 items-center w-[90%] sm:w-96
          border-[1px] border-color-border-primary bg-color-bg-secondary p-8 
          rounded-md z-[1]"
        >
          <InputField
            type="text"
            label="Username"
            name="name"
            placeholder="Your username"
            formik={formik}
          />
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
                {showDefaultBtnLabel && <span>Create</span>}
                {isPending && !isRedirecting && (
                  <Spinner label="Creating" className="w-5 h-5 text-gray-100" />
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
            aria-disabled={isPending || isRedirecting}
            className="w-full mt-6 font-semibold"
          />
          <div className="w-full mt-4 flex justify-center">
            <p className="text-center text-color-1">
              <span className="mr-2">Already have an account?</span>
              <Link
                href="/auth/login"
                className="underline hover:text-blue-500
                 cursor-pointer"
              >
                Log in
              </Link>
            </p>
          </div>
        </form>
        {/* Footer here */}
      </div>
    </Fragment>
  );
};
