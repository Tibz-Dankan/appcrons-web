"use client";

import React, { Fragment } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { Spinner } from "@/app/shared/loader/Spinner";
import { InputField } from "@/app/shared/InputField";
import Button from "@/app/shared/Button";
import { TChangePassword } from "@/types/auth";
import { AuthService } from "@/services/auth.service";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  hideCardNotification,
  showCardNotification,
} from "@/store/actions/notification";

export const ChangePassword: React.FC = () => {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((state) => state.auth).accessToken;
  const user = useAppSelector((state) => state.auth).user;

  const { isPending, mutate } = useMutation({
    mutationFn: new AuthService().changePassword,
    onSuccess: async (response: any) => {
      console.log("response: ", response);
      formik.values = initialValues;
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

  const initialValues: TChangePassword = {
    id: user.id,
    currentPassword: "",
    newPassword: "",
    accessToken: accessToken,
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      currentPassword: Yup.string()
        .max(255)
        .required("Current password is required"),
      newPassword: Yup.string()
        .max(255)
        .min(5)
        .max(30)
        .required("?New password is required"),
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
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-2 items-center w-[90%] sm:w-96"
      >
        <InputField
          type="password"
          name="currentPassword"
          placeholder="Current Password"
          formik={formik}
        />
        <InputField
          type="password"
          name="newPassword"
          placeholder="New Password"
          formik={formik}
        />
        <Button
          label={
            <>
              {!isPending && <span>Submit</span>}
              {isPending && (
                <Spinner label="processing" className="w-5 h-5 text-gray-100" />
              )}
            </>
          }
          type="submit"
          disabled={isPending}
          className="w-full mt-6 font-semibold"
        />
      </form>
    </Fragment>
  );
};
