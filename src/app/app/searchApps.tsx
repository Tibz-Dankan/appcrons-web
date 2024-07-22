"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "@/app/shared/button";
import { Spinner } from "@/app/shared/loader/spinner";
import { useMutation } from "@tanstack/react-query";
import { useAppDispatch } from "@/hooks/redux";
import { AppService } from "@/services/app.service";
import {
  hideCardNotification,
  showCardNotification,
} from "@/store/actions/notification";
import { SearchIcon } from "@/app/shared/Icons/searchIcon";

interface SearchAppsProps {
  onSuccess: (data: any) => void;
}

export const SearchApps: React.FC<SearchAppsProps> = (props) => {
  const dispatch = useAppDispatch();

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

  const initialValues: { search: string } = {
    search: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      search: Yup.string().max(255).required("search input is required"),
    }),

    onSubmit: async (values, helpers) => {
      try {
        // TODO: To get userId and accessToken on the client side from a cookie
        mutate({ userId: "", search: values.search, accessToken: "" });
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
    <div className="w-full flex items-center justify-center p-4">
      <div className="relative w-full">
        <form onSubmit={formik.handleSubmit} className="w-full relative">
          <input
            type="search"
            id="search"
            required
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values["search"]}
            placeholder={"Search apps"}
            className="p-2 pl-2s pr-9  py-2s outline-none rounded-md border-[1px]
            border-color-border-primary focus:border-[1px] focus:border-primary
            transition-all text-sm w-full focus:outline-none
            focus:shadow-[0px_0px_0px_4px_rgba(12,166,120,0.3)]
            text-color-text-primary bg-color-bg-primary"
          />
          <Button
            label={
              <>
                {!isPending && <SearchIcon className="text-[#868e96]" />}
                {isPending && <Spinner className="w-5 h-5 text-[#868e96]" />}
              </>
            }
            type="submit"
            aria-disabled={isPending}
            className="px-0 py-0 h-auto absolute top-2 right-2
            bg-color-bg-primary"
          />
        </form>
      </div>
    </div>
  );
};
