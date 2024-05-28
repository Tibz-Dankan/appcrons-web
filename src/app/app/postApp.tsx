"use client";

import React from "react";
import Button from "@/app/shared/button";
import { Modal } from "@/app/shared/modal";
import { useAppDispatch } from "@/hooks/redux";
import { useMutation } from "@tanstack/react-query";
import {
  hideCardNotification,
  showCardNotification,
} from "@/store/actions/notification";
import { AppService } from "@/services/app.service";
import { TPostApp } from "@/types/app";
import { useFormik } from "formik";
import * as Yup from "yup";
import { InputField } from "../shared/inputField";
import { Spinner } from "../shared/loader/spinner";

export const PostApp: React.FC = () => {
  const dispatch = useAppDispatch();

  const { isPending, mutate } = useMutation({
    mutationFn: new AppService().post,
    onSuccess: async (auth: any) => {
      console.log("");
      // call onPostApp fn to send new app data to the parent component
    },
    onError: (error: any) => {
      dispatch(showCardNotification({ type: "error", message: error.message }));
      console.log("Error: ", error.message);
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    },
  });

  const initialValues: TPostApp = {
    name: "",
    url: "",
    requestInterval: "",
    accessToken: "",
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
    <div className="w-full flex items-center justify-end p-4">
      <Modal openModalElement={<Button type="button" label={"New App"} />}>
        <div className="">
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-0 items-center w-[90%] sm:w-96
             border-[1px]  border-color-border-primary p-8
             bg-color-bg-secondary rounded-md z-[1]"
          >
            <InputField
              type="text"
              name="name"
              placeholder="Application Name"
              formik={formik}
            />
            {/* TODO: to add more information about the url */}
            <InputField
              type="text"
              name="url"
              placeholder="URL"
              formik={formik}
            />
            <InputField
              type="text"
              name="requestInterval"
              placeholder="Select Request Interval"
              formik={formik}
            />
            <Button
              label={
                <>
                  {!isPending && <span>Add</span>}
                  {isPending && (
                    <Spinner
                      label="Logging in"
                      className="w-5 h-5 text-gray-100"
                    />
                  )}
                </>
              }
              type="submit"
              aria-disabled={isPending}
              className="w-full mt-6 font-semibold"
            />
          </form>
        </div>
      </Modal>
    </div>
  );
};
