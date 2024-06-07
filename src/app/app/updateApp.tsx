"use client";

import React from "react";
import Button from "@/app/shared/button";
import { Modal } from "@/app/shared/modal";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useMutation } from "@tanstack/react-query";
import {
  hideCardNotification,
  showCardNotification,
} from "@/store/actions/notification";
import { AppService } from "@/services/app.service";
import { TApp, TUpdateApp } from "@/types/app";
import { useFormik } from "formik";
import * as Yup from "yup";
import { InputField } from "../shared/inputField";
import { Spinner } from "../shared/loader/spinner";
import { IconContext } from "react-icons";
import { RiEdit2Fill } from "react-icons/ri";
import { InputSelect } from "../shared/inputSelect";

interface PostAppProps {
  app: TApp;
  onUpdate: (app: TApp) => void;
}

export const UpdateApp: React.FC<PostAppProps> = (props) => {
  const dispatch = useAppDispatch();

  const accessToken = useAppSelector((state) => state.auth.accessToken);

  const { isLoading, mutate } = useMutation({
    mutationFn: new AppService().update,
    onSuccess: async (response: any) => {
      console.log("update response: ", response);

      props.onUpdate(response.app);
      dispatch(
        showCardNotification({ type: "success", message: response.message })
      );
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    },
    onError: (error: any) => {
      dispatch(showCardNotification({ type: "error", message: error.message }));
      console.log("Error: ", error.message);
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    },
  });

  const initialValues: TUpdateApp = {
    appId: props.app.id,
    name: props.app.name,
    url: props.app.url,
    requestInterval: props.app.requestInterval,
    accessToken: accessToken,
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      name: Yup.string().max(255).required("name is required"),
      url: Yup.string().max(255).required("url is required"),
      requestInterval: Yup.string()
        .max(2)
        .required("request interval is required"),
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

  const intervalOptions = ["5", "10", "15"];

  return (
    <div className="w-full flex items-center justify-end p-4">
      <Modal
        openModalElement={
          <p className="flex items-center gap-2 cursor-pointer">
            <span>
              <IconContext.Provider
                value={{
                  size: "1.2rem",
                  color: "#868e96",
                }}
              >
                <RiEdit2Fill />
              </IconContext.Provider>
            </span>
            <span className="text-sm">Edit</span>
          </p>
        }
      >
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
            <InputSelect
              label="requestInterval"
              options={intervalOptions}
              formik={formik}
            />
            {/* <InputField
              type="text"
              name="requestInterval"
              placeholder="Select Request Interval"
              formik={formik}
            /> */}
            <Button
              label={
                <>
                  {!isLoading && <span>Add</span>}
                  {isLoading && (
                    <Spinner
                      label="Logging in"
                      className="w-5 h-5 text-gray-100"
                    />
                  )}
                </>
              }
              type="submit"
              aria-disabled={isLoading}
              className="w-full mt-6 font-semibold"
            />
          </form>
        </div>
      </Modal>
    </div>
  );
};
