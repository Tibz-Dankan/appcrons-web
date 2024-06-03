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
import { TPostRequestTime, TRequestTime } from "@/types/app";
import { useFormik } from "formik";
import * as Yup from "yup";
import { InputField } from "@/app/shared/inputField";
import { Spinner } from "@/app/shared/loader/spinner";
import { getAccessToken } from "@/utils/getAccessToken";
import { RequestService } from "@/services/request.service";
import { InputSelect } from "@/app/shared/inputSelect";
import times from "@/app/request/data/times.json";

interface PostRequestTimeRangeProps {
  appId: string;
  requestTime: TRequestTime[];
  onPost: () => void;
}

export const PostRequestTimeRange: React.FC<PostRequestTimeRangeProps> = (
  props
) => {
  const dispatch = useAppDispatch();
  const accessToken = getAccessToken();
  const hasTimeZone: boolean = props.requestTime[0]
    ? !!props.requestTime[0].timeZone
    : false;

  const timeOptions = times.times;

  const { isLoading, mutate } = useMutation({
    mutationFn: new RequestService().postRequestTimeRange,
    onSuccess: async (response: any) => {
      console.log("postRequestTimeRange response: ", response);

      // props.onPost(response.app);
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

  const initialValues: TPostRequestTime = {
    appId: props.appId,
    start: "",
    end: "",
    timeZone: hasTimeZone ? props.requestTime[0].timeZone : "",
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

  return (
    <div className="w-full flex items-center justify-end p-4">
      <div
        className="w-52 border-[1px] border-color-border-primary 
        rounded-md p-4 flex flex-col gap-4"
      >
        <p className="text-sm text-color-text-secondary">
          Add new request time frame for the app
        </p>
        <Modal
          openModalElement={
            <Button label={"New"} type={"button"} className="w-full" />
          }
        >
          <div className="">
            {/* Existing request list */}
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
              <InputSelect
                label="start"
                options={timeOptions}
                formik={formik}
              />

              <Button
                label={
                  <>
                    {!isLoading && <span>Submit</span>}
                    {isLoading && (
                      <Spinner
                        label="processing"
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
    </div>
  );
};
