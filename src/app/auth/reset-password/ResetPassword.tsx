"use client";

import React, { Fragment, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { Spinner } from "@/app/shared/loader/Spinner";
import { InputField } from "@/app/shared/InputField";
import Button from "@/app/shared/Button";
import { AuthService } from "@/services/auth.service";
import { Link, useRouter } from "@/lib/router-events";
import { useAppDispatch } from "@/hooks/redux";
import {
  hideCardNotification,
  showCardNotification,
} from "@/store/actions/notification";
// import Image from "next/image";
import { TResetPassword } from "@/types/auth";
import { useParams } from "next/navigation";
import { authenticate } from "@/store/actions/auth";
import { Logo } from "@/app/shared/Logo";

export const ResetPassword: React.FC = () => {
  const dispatch = useAppDispatch();
  const resetToken = useParams()["resetToken"] as string;
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState<boolean>(false);

  const { isPending, mutate } = useMutation({
    mutationFn: new AuthService().resetPassword,
    onSuccess: async (response: any) => {
      dispatch(
        showCardNotification({ type: "success", message: response.message })
      );
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);

      setIsRedirecting(() => true);
      await authenticate(response.accessToken, response.user);
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

  const initialValues: TResetPassword = {
    resetToken: resetToken,
    newPassword: "",
    confirmPassword: "",
  };

  const validPasswords = (formik: any): boolean => {
    const newPassword = formik.values["newPassword"];
    const confirmPassword = formik.values["confirmPassword"];
    if (newPassword === confirmPassword) return true;

    formik.errors["confirmPassword"] = "Passwords don't match!";
    return false;
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      newPassword: Yup.string().max(255).required("New password is required"),
      confirmPassword: Yup.string()
        .max(255)
        .required("Confirm password is required"),
    }),

    onSubmit: async (values, helpers) => {
      try {
        if (!validPasswords(formik)) return;
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
          <p className="text-center text-2xl">Reset your password</p>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-0 items-center w-[90%] sm:w-96
          border-[1px]  border-color-border-primary p-8
          bg-color-bg-secondary rounded-md z-[1]"
        >
          <div className="mb-4">
            <p>
              To complete this process, provide your new password and its
              confirmation.
            </p>
          </div>
          <InputField
            type="password"
            name="newPassword"
            label="New Password"
            placeholder="Your new password"
            formik={formik}
          />
          <InputField
            type="password"
            label="Confirm Password"
            name="confirmPassword"
            placeholder="Your confirm password"
            formik={formik}
          />
          <Button
            label={
              <>
                {showDefaultBtnLabel && <span>Reset</span>}
                {isPending && !isRedirecting && (
                  <Spinner
                    label="Resetting"
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
              <Link href="/auth/login" className="">
                Remember password? Log in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </Fragment>
  );
};
