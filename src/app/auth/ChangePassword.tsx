"use client";

import React, { Fragment, useState } from "react";
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
import { useLogOut } from "@/hooks/useLogOut";

export const ChangePassword: React.FC = () => {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((state) => state.auth).accessToken;
  const user = useAppSelector((state) => state.auth).user;
  const [triggerLogOut, setTriggerLogOut] = useState(false);

  const { isLoggingOut } = useLogOut({ triggerLogOut: triggerLogOut });

  const { isPending, mutate } = useMutation({
    mutationFn: new AuthService().changePassword,
    onSuccess: async (response: any) => {
      console.log("response: ", response);
      formik.resetForm();
      dispatch(
        showCardNotification({ type: "success", message: response.message }),
      );
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
      setTriggerLogOut(() => true);
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
        .min(5)
        .max(30)
        .required("Current password is required"),
      newPassword: Yup.string()
        .min(5)
        .max(30)
        .required("New password is required"),
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
          label="Current Password"
          placeholder="Current Password"
          formik={formik}
        />
        <InputField
          type="password"
          name="newPassword"
          label="New Password"
          placeholder="New Password"
          formik={formik}
        />
        <Button
          label={
            <>
              {!isPending && !isLoggingOut && <span>Submit</span>}
              {(isPending || isLoggingOut) && (
                <Spinner label="processing" className="w-5 h-5 text-gray-100" />
              )}
            </>
          }
          type="submit"
          disabled={isPending || isLoggingOut}
          className="w-full mt-6 font-semibold"
        />
      </form>
    </Fragment>
  );
};
