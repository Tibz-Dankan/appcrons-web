import React, { useEffect, useState } from "react";
import Button from "@/app/shared/button";
import { Modal } from "../shared/modal";
import { InputField } from "../shared/inputField";
import { Spinner } from "../shared/loader/spinner";
import {
  hideCardNotification,
  showCardNotification,
} from "@/store/actions/notification";
import { TApp } from "@/types/app";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AppService } from "@/services/app.service";
import { useRouter } from "next/navigation";
import { deleteOneApp } from "@/store/actions/app";

interface DeleteAppProps {
  app: TApp;
}

export const DeleteApp: React.FC<DeleteAppProps> = (props) => {
  const [isClosedModal, setIsClosedModal] = useState(false);
  const [isMatchingAppName, setIsMatchingAppName] = useState(false);

  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((state) => state.auth).accessToken;
  const app = props.app;
  const router = useRouter();

  const { isLoading, mutate } = useMutation({
    mutationFn: new AppService().delete,
    onSuccess: (response: any) => {
      dispatch(deleteOneApp(app.id));
      dispatch(
        showCardNotification({ type: "success", message: response.message })
      );
      setTimeout(() => {
        showCardNotification({
          type: "info",
          message: "Redirecting to dashboard",
        });
      }, 3000);
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 6000);

      setIsClosedModal(() => true);
      setTimeout(() => {
        router.push("/dashboard");
      }, 7000);
    },
    onError: (error: any) => {
      dispatch(showCardNotification({ type: "error", message: error.message }));
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    },
  });

  const initialValues = {
    appName: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({}),
    onSubmit: async (_, helpers) => {
      try {
        mutate({ appId: app.id, accessToken: accessToken });
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

  const validateInput = (userInput: string) => {
    const expectedInput = `delete application ${app.name}`;
    const isSameInput: boolean = expectedInput === userInput;
    setIsMatchingAppName(() => isSameInput);
  };

  useEffect(() => {
    const updateAppNameHandler = () => {
      validateInput(formik.values["appName"]);
    };

    updateAppNameHandler();
  }, [formik.values]);

  const isBtnDisabled: boolean = isLoading || !isMatchingAppName;

  return (
    <div
      className="flex items-center justify-between border-[1px]
     border-color-border-primary rounded-md p-8"
    >
      <div className="flex flex-col gap-2 ">
        <p className="text-xl  text-color-text-primary">
          <span>Delete this Application</span>
        </p>
        <p>
          <span className=" text-color-text-secondary">
            Once you delete an application, there is no going back. Please be
            certain.
          </span>
        </p>
      </div>

      <Modal
        openModalElement={
          <div className="">
            <Button
              label={"Delete app"}
              type={"button"}
              className="bg-[#ff4d4f]"
            />
          </div>
        }
        closed={isClosedModal}
      >
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-0 items-center w-[90%] sm:w-96
           rounded-md z-[1] p-4 sm:p-8"
        >
          <div className="text-sm w-full flex flex-col gap-4">
            <p className="">
              All requests and request time ranges associated with{" "}
              <span className="mx-1 font-semibold">{app.name}</span>
              will be deleted immediately. This action cannot be undone.
            </p>
            <p>Are you sure you want to delete this application?</p>
            <label htmlFor="roomName" className="">
              Type
              <span className="text-[#ff4d4f] ml-1 font-semibold">
                delete application {" " + app.name + " "}
              </span>
              below to confirm.
            </label>
          </div>
          <div className="w-full">
            <InputField
              type="text"
              name="appName"
              placeholder="Type here"
              formik={formik}
            />
          </div>
          <div className="w-full flex items-center justify-between gap-4 mt-6">
            <Button
              label={"Cancel"}
              type="button"
              disabled={isLoading}
              onClick={() => setIsClosedModal(() => true)}
              className="w-32 font-semibold bg-gray-600
              disabled:opacity-60"
            />
            <Button
              label={
                <>
                  {!isLoading && <span>Delete</span>}
                  {isLoading && (
                    <Spinner
                      label="deleting"
                      className="w-5 h-5 text-gray-100"
                    />
                  )}
                </>
              }
              type="submit"
              disabled={isBtnDisabled}
              className="w-32 font-semibold bg-[#ff4d4f]
              disabled:opacity-60"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};
