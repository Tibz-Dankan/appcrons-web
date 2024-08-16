"use client";

import React from "react";
import Button from "@/app/shared/Button";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useMutation } from "@tanstack/react-query";
import {
  hideCardNotification,
  showCardNotification,
} from "@/store/actions/notification";
import { AppService } from "@/services/app.service";
import { TApp, TPostApp } from "@/types/app";
import { useFormik } from "formik";
import * as Yup from "yup";
import { InputField } from "../shared/InputField";
import { Spinner } from "../shared/loader/Spinner";
import { InputSelect } from "../shared/InputSelect";
import { addOneApp } from "@/store/actions/app";
import { useRouter } from "next/navigation";

interface PostAppProps {
  onPost: (app: TApp) => void;
}

export const PostApp: React.FC<PostAppProps> = (props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const accessToken = useAppSelector((state) => state.auth.accessToken);

  const { isPending, mutate } = useMutation({
    mutationFn: new AppService().post,
    onSuccess: async (response: any) => {
      props.onPost(response.app);
      dispatch(addOneApp({ app: response.app }));
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

  const initialValues: TPostApp = {
    name: "",
    url: "",
    requestInterval: "5",
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
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col gap-0 items-center w-[90%] sm:w-96"
    >
      <InputField
        type="text"
        name="name"
        label="Application Name"
        placeholder="Application Name"
        formik={formik}
      />
      <InputField
        type="text"
        name="url"
        label="URL Endpoint"
        placeholder="e.g applicationname.com/active"
        formik={formik}
      />
      <InputSelect
        label="Request Interval"
        name="requestInterval"
        options={intervalOptions}
        formik={formik}
      />
      <Button
        label={
          <>
            {!isPending && <span>Create</span>}
            {isPending && (
              <Spinner label="creating" className="w-5 h-5 text-gray-100" />
            )}
          </>
        }
        type="submit"
        disabled={isPending}
        className="w-full mt-5 font-semibold"
      />
    </form>
  );
};
