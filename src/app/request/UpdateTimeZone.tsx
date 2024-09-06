"use client";

import React from "react";
import Button from "@/app/shared/Button";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useMutation } from "@tanstack/react-query";
import {
  hideCardNotification,
  showCardNotification,
} from "@/store/actions/notification";
import { TApp, TUpdateTimeZone } from "@/types/app";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Spinner } from "@/app/shared/loader/Spinner";
import { RequestService } from "@/services/request.service";
import { updateOneApp } from "@/store/actions/app";
import { TimeZoneSelect } from "@/app/shared/TimeZoneSelect";
import { truncateString } from "@/utils/truncateString";

interface UpdateTimeZoneProps {
  app: TApp;
  onSuccess: (succeeded: boolean) => void;
  onCancel: (cancelled: boolean) => void;
}

export const UpdateTimeZone: React.FC<UpdateTimeZoneProps> = (props) => {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((state) => state.auth).accessToken;
  const currentApp = useAppSelector((state) =>
    state.app.apps.find((app) => app.id === props.app.id)
  )!;

  const app: TApp = JSON.parse(JSON.stringify(currentApp));

  const onSuccessHandler = (succeeded: true) => {
    props.onSuccess(succeeded);
  };

  const onCancelHandler = (cancelled: true) => {
    props.onSuccess(cancelled);
  };

  const onSelectTimeZoneHandler = (timeZone: string) => {
    if (!timeZone) return;
    formik.values.timeZone = timeZone;
  };

  const { isPending, mutate } = useMutation({
    mutationFn: new RequestService().updateTimeZone,
    onSuccess: async (response: any) => {
      app.requestTimes = response.requestTimes;
      dispatch(updateOneApp({ app: app }));
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
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    },
  });

  const initialValues: TUpdateTimeZone = {
    appId: app.id,
    timeZone: app.requestTimes[0]?.timeZone,
    accessToken: accessToken,
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      timeZone: Yup.string().max(255).required("Time zone is required"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        mutate({
          appId: values.appId,
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

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col gap-4 items-center w-[90vw] sm:w-96
       rounded-md z-[1] p-8"
    >
      <div className="flex items-center justify-between w-full">
        <p className="font-semibold">{truncateString(app.name, 40)}</p>
      </div>
      <div className="w-full">
        <p className="text-start text-sm">
          Edit timezone for this application.
        </p>
      </div>
      <div className="w-full">
        <TimeZoneSelect
          onSelect={onSelectTimeZoneHandler}
          defaultTimeZone={app.requestTimes[0]?.timeZone}
        />
      </div>
      <div className="w-full flex items-center justify-between gap-4 mt-2">
        <Button
          label={"Cancel"}
          type="button"
          disabled={isPending}
          onClick={() => onCancelHandler(true)}
          className="w-28 font-semibold bg-gray-600"
        />
        <Button
          label={
            <>
              {!isPending && (
                <>
                  <span className="hidden md:block">Save Changes</span>
                  <span className="sm:hidden">Save</span>
                </>
              )}
              {isPending && (
                <Spinner label="saving" className="w-5 h-5 text-gray-100" />
              )}
            </>
          }
          type="submit"
          disabled={isPending}
          className="w-28 sm:w-36 font-semibold"
        />
      </div>
    </form>
  );
};
