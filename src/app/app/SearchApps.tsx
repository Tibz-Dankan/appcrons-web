"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "@/app/shared/Button";
import { Spinner } from "@/app/shared/loader/Spinner";
import { useMutation } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { AppService } from "@/services/app.service";
import {
  hideCardNotification,
  showCardNotification,
} from "@/store/actions/notification";
import { SearchIcon } from "@/app/shared/Icons/SearchIcon";
import { TSearchInput } from "@/types/app";

interface SearchAppsProps {
  onSuccess: (data: any) => void;
}

export const SearchApps: React.FC<SearchAppsProps> = (props) => {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const userId = useAppSelector((state) => state.auth.user.id);

  const { isPending, mutate } = useMutation({
    mutationFn: new AppService().search,
    onSuccess: async (data: any) => {
      console.log("data:: ", data);
      props.onSuccess(data);
    },
    onError: (error: any) => {
      dispatch(showCardNotification({ type: "error", message: error.message }));
      console.log("Error: ", error.message);
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    },
  });

  const initialValues: TSearchInput = {
    userId: userId,
    query: "",
    accessToken: accessToken,
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      query: Yup.string().max(255).required("search input is required"),
    }),

    onSubmit: async (values, helpers) => {
      try {
        // TODO: To get userId and accessToken on the client side from a cookie
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

  const hasSearchQuery = !!formik.values["query"];

  return (
    <div className="w-full flex items-center justify-center">
      <div className="relative w-full">
        <form onSubmit={formik.handleSubmit} className="w-full relative">
          <input
            type="text"
            id="query"
            required
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values["query"]}
            placeholder={"Search applications"}
            className="pl-3 py-[10px] pr-9 outline-none rounded-md border-[1px]
            border-color-border-primary focus:border-[1px] focus:border-primary
            transition-all text-sm w-full focus:outline-none
            focus:shadow-[0px_0px_0px_4px_rgba(12,166,120,0.3)]
            text-color-text-primary bg-color-bg-primary appearance-none"
          />
          <Button
            label={
              <>
                {!isPending && (
                  <SearchIcon
                    className={`${
                      hasSearchQuery
                        ? "text-color-text-primary"
                        : "text-[#868e96]"
                    }`}
                  />
                )}
                {isPending && (
                  <Spinner className="w-5 h-5 text-color-text-primary -mr-2" />
                )}
              </>
            }
            type="submit"
            aria-disabled={isPending}
            className={`px-2 pr-0s py-[6px] h-auto absolute top-[5px] right-1
             ${hasSearchQuery ? "bg-primary" : "bg-color-bg-primary"}`}
          />
        </form>
      </div>
    </div>
  );
};
