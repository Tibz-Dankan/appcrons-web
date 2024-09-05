"use client";

import React, { useEffect, useState } from "react";
import Button from "@/app/shared/Button";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useMutation } from "@tanstack/react-query";
import {
  hideCardNotification,
  showCardNotification,
} from "@/store/actions/notification";
import { TApp, TRequestTime, TUpdateRequestTime } from "@/types/app";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Spinner } from "@/app/shared/loader/Spinner";
import { RequestService } from "@/services/request.service";
import { InputSelect } from "@/app/shared/InputSelect";
import times from "@/app/request/data/times.json";
import { validateTimeRange } from "@/utils/validateTimeRange";
import { convertTo24HourFormat } from "@/utils/convertTo24HourFormat";
import { truncateString } from "@/utils/truncateString";
import { convertTo12HourFormat } from "@/utils/convertTo 12HourFormat";
import { updateOneApp } from "@/store/actions/app";
import { CheckIcon } from "@/app/shared/Icons/CheckIcon";
import { ErrorIcon } from "@/app/shared/Icons/ErrorIcon";

interface UpdateRequestTimeRangeProps {
  requestTimeId: string;
  app: TApp;
  onSuccess: (succeeded: boolean) => void;
}

export const UpdateRequestTimeRange: React.FC<UpdateRequestTimeRangeProps> = (
  props
) => {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((state) => state.auth).accessToken;
  const currentApp = useAppSelector((state) =>
    state.app.apps.find((app) => app.id === props.app.id)
  )!;
  const app: TApp = JSON.parse(JSON.stringify(currentApp));

  const hasTimeZone: boolean = !!app.requestTimes[0]?.timeZone;

  const timeOptions = times.times;
  const [validateReqTimeRange, setValidateReqTimeRange] = useState<{
    isValid: boolean;
    message: string;
  }>({ isValid: false, message: "" });

  const getAppTimezone = (): string => {
    if (!hasTimeZone) return "";
    return app.requestTimes[0]?.timeZone;
  };

  const requestTimeList = app.requestTimes as TRequestTime[];

  const getCurrentRequestTime = (): TRequestTime => {
    return requestTimeList.find(
      (requestTime) => requestTime.id === props.requestTimeId
    ) as TRequestTime;
  };

  const getRequestTimeValidationList = (): TRequestTime[] => {
    return requestTimeList.filter(
      (requestTime) => requestTime.id !== props.requestTimeId
    );
  };

  const onUpdateRequestTimeHandler = (candidateRequestTime: TRequestTime) => {
    const requestTimeIndex = app.requestTimes.findIndex((requestTime) => {
      return requestTime.id === candidateRequestTime.id;
    }) as number;
    if (requestTimeIndex === -1) return;

    app.requestTimes[requestTimeIndex] = candidateRequestTime;
    dispatch(updateOneApp({ app: app }));
  };

  const onSuccessHandler = (succeeded: true) => {
    props.onSuccess(succeeded);
  };

  const { isPending, mutate } = useMutation({
    mutationFn: new RequestService().updateRequestTimeRange,
    onSuccess: async (response: any) => {
      onUpdateRequestTimeHandler(response.requestTime);
      dispatch(
        showCardNotification({ type: "success", message: response.message })
      );
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
      onSuccessHandler(true);
    },
    onError: (error: any) => {
      dispatch(showCardNotification({ type: "error", message: error.message }));
      console.log("Error: ", error.message);
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    },
  });

  const initialValues: TUpdateRequestTime = {
    requestTimeId: props.requestTimeId,
    appId: app.id,
    start: convertTo12HourFormat(getCurrentRequestTime().start),
    end: convertTo12HourFormat(getCurrentRequestTime().end),
    timeZone: getAppTimezone(),
    accessToken: accessToken,
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      start: Yup.string().max(255).required("start time is required"),
      end: Yup.string().max(255).required("end time is required"),
    }),

    onSubmit: async (values, helpers) => {
      try {
        mutate({
          requestTimeId: props.requestTimeId,
          appId: app.id,
          start: convertTo24HourFormat(values.start),
          end: convertTo24HourFormat(values.end),
          timeZone: values.timeZone,
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

  useEffect(() => {
    const validateTimeRangeHandler = () => {
      if (!formik.values.start || !formik.values.end) return;
      const validator = validateTimeRange(
        getRequestTimeValidationList(),
        convertTo24HourFormat(formik.values.start),
        convertTo24HourFormat(formik.values.end)
      );

      setValidateReqTimeRange({
        isValid: validator.isValid,
        message: validator.message,
      });
    };
    validateTimeRangeHandler();
  }, [formik.values.start, formik.values.end]);

  const showTimeRangeSuccessMessage =
    validateReqTimeRange.isValid && !!validateReqTimeRange.message;
  const showTimeRangeErrorMessage =
    !validateReqTimeRange.isValid && !!validateReqTimeRange.message;
  const isDisabledSubmitBtn = isPending || showTimeRangeErrorMessage;

  return (
    <div
      className="flex flex-col gap-4 items-center w-[90vw] sm:w-96
      border-[1px]s  border-color-border-primary p-8
      bg-color-bg-primary rounded-md max-h-[70vh] overflow-x-auto
      shadow-2xl"
    >
      <div className="flex items-center justify-between w-full">
        <p className="font-semibold">{truncateString(app.name, 40)}</p>
      </div>
      <div className="flex items-center justify-start gap-4 w-full">
        <p className="text-color-text-secondary text-sm">Edit Time Frame</p>
        <p
          className="flex items-center justify-between gap-1
          bg-color-bg-secondary p-2 rounded"
        >
          <span>{convertTo12HourFormat(getCurrentRequestTime().start)}</span>
          <span>-</span>
          <span>{convertTo12HourFormat(getCurrentRequestTime().end)}</span>
        </p>
      </div>
      <div className="w-full space-y-1">
        <span className="text-sm text-color-text-secondary">
          Existing Time Frame
        </span>
        <div
          className="grid grid-cols-2 gap-2 p-4s py-2
          border-[1px]s border-color-border-primary rounded-md"
        >
          {/* TODO: organize time ranges based on the start time in ascending order */}
          {requestTimeList.map((requestTime, index) => (
            <p
              key={index}
              className={`flex items-center justify-center gap-1 
                 p-2 rounded-md text-[12px]
                 ${
                   getCurrentRequestTime().id === requestTime.id
                     ? "border-[2px] border-primary"
                     : "border-[1px] border-color-border-primary"
                 }`}
            >
              <span>{convertTo12HourFormat(requestTime?.start)}</span>
              <span>-</span>
              <span>{convertTo12HourFormat(requestTime?.end)}</span>
            </p>
          ))}
        </div>
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-0 items-center w-full
        rounded-md z-[1]"
      >
        <div className="w-full mb-2">
          <p
            className="text-[12px] text-color-text-primary
            p-2 border-[1px] border-color-border-primary rounded-md"
          >
            Edit Time Frame by selecting your preferred Start and End time
            below.
          </p>
        </div>
        <div className="w-full">
          {showTimeRangeSuccessMessage && (
            <div
              className="border-[1px] border-color-border-primary rounded-md
              p-2 w-full mb-2 flex justify-start items-start gap-2"
            >
              <CheckIcon className="text-success" />
              <p className="text-success text-sm text-start">
                {validateReqTimeRange.message}
              </p>
            </div>
          )}
          {showTimeRangeErrorMessage && (
            <div
              className="border-[1px] border-color-border-primary rounded-md
              p-2 w-full mb-2 flex justify-start items-start gap-2"
            >
              <ErrorIcon className="text-error" />
              <p className="text-error text-sm text-start">
                {validateReqTimeRange.message}
              </p>
            </div>
          )}
        </div>
        <div className="w-full flex items-center gap-4 justify-between">
          <InputSelect
            label="Start time"
            name="start"
            options={timeOptions}
            defaultOption={convertTo12HourFormat(getCurrentRequestTime().start)}
            formik={formik}
          />
          <InputSelect
            label="End time"
            name="end"
            options={timeOptions}
            defaultOption={convertTo12HourFormat(getCurrentRequestTime().end)}
            formik={formik}
          />
        </div>

        <Button
          label={
            <>
              {!isPending && (
                <span
                  className={`${showTimeRangeErrorMessage && "text-[#adb5bd]"}`}
                >
                  Submit
                </span>
              )}
              {isPending && (
                <Spinner label="processing" className="w-5 h-5 text-gray-100" />
              )}
            </>
          }
          type="submit"
          disabled={isDisabledSubmitBtn}
          className="w-full mt-6 font-semibold"
        />
      </form>
    </div>
  );
};
