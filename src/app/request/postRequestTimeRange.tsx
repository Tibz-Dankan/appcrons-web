"use client";

import React, { useEffect, useState } from "react";
import Button from "@/app/shared/button";
import { Modal } from "@/app/shared/modal";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useMutation } from "@tanstack/react-query";
import {
  hideCardNotification,
  showCardNotification,
} from "@/store/actions/notification";
import { TApp, TPostRequestTime, TRequestTime } from "@/types/app";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Spinner } from "@/app/shared/loader/spinner";
import { RequestService } from "@/services/request.service";
import { InputSelect } from "@/app/shared/inputSelect";
import times from "@/app/request/data/times.json";
import appData from "@/app/app/data/apps.json";
import { TimeZoneSelect } from "@/app/shared/timeZoneSelect";
import { validateTimeRange } from "@/utils/validateTimeRange";
import { convertTo24HourFormat } from "@/utils/convertTo24HourFormat";

interface PostRequestTimeRangeProps {
  app: TApp;
  onPost: () => void;
}

export const PostRequestTimeRange: React.FC<PostRequestTimeRangeProps> = (
  props
) => {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((state) => state.auth).accessToken;
  console.log("accessToken:->:", accessToken);
  const app = props.app;
  const hasTimeZone: boolean =
    app.requestTimes !== null ? !!app.requestTimes[0]?.timeZone : false;

  const timeOptions = times.times;
  const [validateReqTimeRange, setValidateReqTimeRange] = useState<{
    isValid: boolean;
    message: string;
  }>({ isValid: false, message: "" });

  const getAppTimezone = (): string => {
    if (hasTimeZone) {
      return app.requestTimes !== null
        ? app.requestTimes && app.requestTimes[0]?.timeZone
        : "";
    }
    return "";
  };

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
    appId: app.id,
    start: "",
    end: "",
    timeZone: getAppTimezone(),
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
        mutate({
          appId: app.id,
          start: convertTo24HourFormat(values.start),
          end: convertTo24HourFormat(values.end),
          timeZone: getAppTimezone(),
          accessToken: accessToken,
        });
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

  const onSelectTimeZoneHandler = (timeZone: string) => {
    console.log("timeZone: ", timeZone);
    if (!timeZone) return;
    formik.values.timeZone = timeZone;
  };

  console.log("formik.values:", formik.values);

  // const requestTimeList = app.requestTimes as TRequestTime[];
  const requestTimeList = appData.apps[1].requestTimes as TRequestTime[]; // To be removed

  useEffect(() => {
    const validateTimeRangeHandler = () => {
      if (!formik.values.start || !formik.values.end) return;
      const validator = validateTimeRange(
        requestTimeList,
        convertTo24HourFormat(formik.values.start),
        convertTo24HourFormat(formik.values.end)
      );

      console.log("validator : ", validator);

      setValidateReqTimeRange({
        isValid: validator.isValid,
        message: validator.message,
      });
    };
    validateTimeRangeHandler();
  }, [formik.values.start, formik.values.end]);

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
          <div
            className="flex flex-col gap-4 items-center w-[90%] sm:w-96
             border-[1px]  border-color-border-primary p-8
             bg-color-bg-secondary rounded-md"
          >
            <div className="flex items-center justify-between gap-4 w-full">
              <p className="">{app.name}</p>
              {hasTimeZone ? (
                <p className="space-x-2 text-sm">
                  <span>Time Zone:</span>
                  <span>{getAppTimezone()}</span>
                </p>
              ) : (
                <div>
                  <TimeZoneSelect onSelect={onSelectTimeZoneHandler} />
                </div>
              )}
            </div>
            {/* Existing requestTimeRange list */}
            <div
              className="grid grid-cols-2 gap-2 p-4 bg-color-bg-secondary
               border-[1px] border-color-border-primary rounded-md "
            >
              {requestTimeList.map((requestTime, index) => (
                <p
                  key={index}
                  className="flex items-center justify-center gap-2 
                     p-2 bg-color-bg-secondary border-[1px] border-color-border-primary
                     rounded-md text-[12px]"
                >
                  <span>{requestTime?.start}</span>
                  <span>-</span>
                  <span>{requestTime?.end}</span>
                </p>
              ))}
            </div>
            <form
              onSubmit={formik.handleSubmit}
              className="flex flex-col gap-0 items-center w-[90%] sm:w-full
              bg-color-bg-secondary rounded-md z-[1]"
            >
              <div className="w-full">
                {validateReqTimeRange.isValid &&
                  validateReqTimeRange.message && (
                    <div
                      className="border-[1px] border-color-border-primary rounded-md
                       p-2 w-full mb-2"
                    >
                      <p className="text-green-500 text-[14px] text-start">
                        {validateReqTimeRange.message}
                      </p>
                    </div>
                  )}
                {!validateReqTimeRange.isValid &&
                  validateReqTimeRange.message && (
                    <div
                      className="border-[1px] border-color-border-primary rounded-md
                       p-2 w-full mb-2"
                    >
                      <p className="text-red-500 text-[14px] text-start">
                        {validateReqTimeRange.message}
                      </p>
                    </div>
                  )}
              </div>
              <div className="w-full flex items-center gap-4 justify-between">
                <div className="w-full -space-y-4">
                  <label htmlFor="Start" className="text-sm">
                    Start
                  </label>
                  <InputSelect
                    label="start"
                    options={timeOptions}
                    formik={formik}
                  />
                </div>
                <div className="w-full -space-y-4">
                  <label htmlFor="End" className="text-sm">
                    End
                  </label>
                  <InputSelect
                    label="end"
                    options={timeOptions}
                    formik={formik}
                  />
                </div>
              </div>

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
