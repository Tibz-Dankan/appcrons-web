import React from "react";
import { LogoutIcon } from "@/app/shared/Icons/LogoutIcon";
import { useRouter } from "@/lib/router-events";
import { useAppDispatch } from "@/hooks/redux";
import { AuthService } from "@/services/auth.service";
import {
  hideCardNotification,
  showCardNotification,
} from "@/store/actions/notification";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "@/app/shared/Button";
import { Spinner } from "@/app/shared/loader/Spinner";
import { logout } from "@/store/actions/auth";

export const LogOut: React.FC = () => {
  const router = useRouter();

  const dispatch: any = useAppDispatch();

  const { isPending, mutate } = useMutation({
    mutationFn: new AuthService().logOut,
    onSuccess: async (_: any) => {
      dispatch(logout());
      router.push("/auth/login");
    },
    onError: (error: any) => {
      dispatch(showCardNotification({ type: "error", message: error.message }));
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    },
  });

  const formik = useFormik({
    initialValues: {},
    validationSchema: Yup.object({}),

    onSubmit: async (values, helpers) => {
      try {
        mutate();
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
      className={"w-full block px-4 py-2 cursor-pointer"}
      onSubmit={formik.handleSubmit}
    >
      <Button
        label={
          <>
            {!isPending && (
              <div className="flex items-center justify-start gap-4">
                <LogoutIcon />
                <span>Log out</span>
              </div>
            )}
            {isPending && (
              <Spinner
                label="logging out"
                className="w-5 h-5 text-color-text-primary"
              />
            )}
          </>
        }
        className="bg-transparent h-full text-color-text-primary
         px-0 py-0 text-sm"
        type={"submit"}
      />
    </form>
  );
};
