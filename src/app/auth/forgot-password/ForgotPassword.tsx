"use client";

import React, { Fragment, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { Spinner } from "@/app/shared/loader/Spinner";
import { InputField } from "@/app/shared/InputField";
import Button from "@/app/shared/Button";
import { AuthService } from "@/services/auth.service";
import { Link } from "@/lib/router-events";
import { useAppDispatch } from "@/hooks/redux";
import {
  hideCardNotification,
  showCardNotification,
} from "@/store/actions/notification";
import Image from "next/image";

export const ForgotPassword: React.FC = () => {
  const dispatch = useAppDispatch();

  const { isPending, mutate } = useMutation({
    mutationFn: new AuthService().forgotPassword,
    onSuccess: async (response: any) => {
      dispatch(
        showCardNotification({ type: "success", message: response.message })
      );
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    },
    onError: (error: any) => {
      dispatch(showCardNotification({ type: "error", message: error.message }));
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    },
  });

  type TForgotPassword = {
    email: string;
  };

  const initialValues: TForgotPassword = {
    email: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      email: Yup.string().max(255).required("email is required"),
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
        className="flex flex-col items-center justify-center gap-4
         min-h-[100vh] min-w-[100vw]"
      >
        <div className="w-full flex flex-col items-center gap-8">
          <Link href="/">
            <Image src="/logo.png" width={80} height={80} alt="logo" />
          </Link>
          <p className="text-center text-2xl">Reset your password</p>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-0 items-center w-[90%] sm:w-96
          border-[1px]  border-color-border-primary p-8
          bg-color-bg-secondary rounded-md z-[1]"
        >
          <div>
            <p>
              Enter your Appcrons's account email address and we will send you a
              password reset link.
            </p>
          </div>
          <InputField
            type="email"
            name="email"
            placeholder="Email address"
            formik={formik}
          />
          <Button
            label={
              <>
                {!isPending && <span>Submit</span>}
                {isPending && (
                  <Spinner
                    label="Submitting"
                    className="w-5 h-5 text-gray-100"
                  />
                )}
              </>
            }
            type="submit"
            disabled={isPending}
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
