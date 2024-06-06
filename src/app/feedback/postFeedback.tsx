"use client";

import React from "react";
import { IconContext } from "react-icons";
import { TbMessage } from "react-icons/tb";
import Button from "@/app/shared/button";
import { Modal } from "@/app/shared/modal";
import { useMutation } from "@tanstack/react-query";
import {
  hideCardNotification,
  showCardNotification,
} from "@/store/actions/notification";
import { useFormik } from "formik";
import * as Yup from "yup";

import { Spinner } from "@/app/shared/loader/spinner";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { FeedService } from "@/services/feedback.service";
import { TPostFeedback } from "@/types/feedback";
import { InputTextArea } from "@/app/shared/inputTextArea";
import { AppRating } from "@/app/shared/rating";

export const PostFeedback: React.FC = () => {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const userId = useAppSelector((state) => state.auth.user.id);

  const { isLoading, mutate } = useMutation({
    mutationFn: new FeedService().post,
    onSuccess: async (response: any) => {
      console.log("postFeedback response: ", response);

      dispatch(
        showCardNotification({ type: "success", message: response.message })
      );
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);

      formik.values = initialValues;
    },
    onError: (error: any) => {
      dispatch(showCardNotification({ type: "error", message: error.message }));
      console.log("Error: ", error.message);
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    },
  });

  const initialValues: TPostFeedback = {
    userId: userId,
    rating: 0,
    message: "",
    accessToken: accessToken,
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      // message: Yup.string().max(255).required("message is required"),
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

  const ratingChangeHandler = (rating: number) => {
    if (!rating) return;
    formik.values.rating = rating;
  };

  return (
    <Modal
      openModalElement={
        <div className="flex items-center justify-center gap-2">
          <span className="cursor-pointer">
            <IconContext.Provider
              value={{
                size: "1.3rem",
                color: "#868e96",
              }}
            >
              <TbMessage />
            </IconContext.Provider>
          </span>
          <span className="text-color-text-secondary text-sm">Feedback</span>
        </div>
      }
    >
      <div
        className="flex flex-col gap-4 items-center w-[90%] sm:w-96
            border-[1px]  border-color-border-primary p-8
            bg-color-bg-secondary rounded-md max-h-[70vh] overflow-x-auto"
      >
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-0 items-center w-[90%] sm:w-full
              bg-color-bg-secondary rounded-md z-[1]"
        >
          <div
            className="w-full mb-4 p-4 border-[1px] border-color-border-primary
                 rounded-md text-center space-y-2"
          >
            <p className="text-3xl font-semibold text-color-text-primary">
              Give us feedback
            </p>
            <p className="text-sm text-color-text-secondary">
              Your feedback helps us improve Appcrons
            </p>
          </div>
          <div className="w-full mb-2 flex flex-col items-start gap-4">
            <p
              className="text-sm text-color-text-primary
                   p-2s border-[1px]s border-color-border-primary rounded-md"
            >
              How satisfied are you with Appcrons in regards to managing the
              availability of your backend servers on render.com? Give us a
              rating
            </p>
            <AppRating value={0} onChange={ratingChangeHandler} />
          </div>
          <InputTextArea
            name={"message"}
            placeholder="Your message"
            formik={formik}
          />
          <Button
            label={
              <>
                {!isLoading && <span className={""}>Submit</span>}
                {isLoading && (
                  <Spinner
                    label="submitting"
                    className="w-5 h-5 text-gray-100"
                  />
                )}
              </>
            }
            type="submit"
            disabled={isLoading}
            className="w-full mt-6 font-semibold"
          />
        </form>
      </div>
    </Modal>
  );
};
