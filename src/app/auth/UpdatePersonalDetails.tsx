"use client";

import React, { Fragment } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { Spinner } from "@/app/shared/loader/Spinner";
import { InputField } from "@/app/shared/InputField";
import Button from "@/app/shared/Button";
import { TUpdateUser } from "@/types/auth";
import { AuthService } from "@/services/auth.service";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  hideCardNotification,
  showCardNotification,
} from "@/store/actions/notification";

export const UpdatePersonalDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((state) => state.auth).accessToken;
  // TODO: to make api call to get the user details || all settings details
  // probably using another component
  const user = useAppSelector((state) => state.auth).user;

  const { isPending, mutate } = useMutation({
    mutationFn: new AuthService().updateUserDetails,
    onSuccess: async (response: any) => {
      // TODO: to update the user details on the client side in redux
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

  const initialValues: TUpdateUser = {
    id: user.id,
    email: user.email,
    name: user.name,
    accessToken: accessToken,
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      email: Yup.string().max(255).required("email is required"),
      name: Yup.string().max(255).min(5).max(30).required("name is required"),
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
          type="text"
          name="name"
          placeholder="Full Name"
          formik={formik}
        />

        <InputField
          type="email"
          name="email"
          placeholder="Email address"
          formik={formik}
        />
        <Button
          label={
            <>
              {!isPending && <span>Save Changes</span>}
              {isPending && (
                <Spinner label="Saving" className="w-5 h-5 text-gray-100" />
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
