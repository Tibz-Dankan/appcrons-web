import { useEffect } from "react";
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
import { logout } from "@/store/actions/auth";

type TLogOut = { triggerLogOut: boolean };

export const useLogOut = ({ triggerLogOut }: TLogOut) => {
  const router = useRouter();
  const dispatch: any = useAppDispatch();

  const {
    isPending: isLoggingOut,
    error,
    isError,
    mutate,
  } = useMutation({
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

  useEffect(() => {
    if (!triggerLogOut) return;

    const logOutHandler = () => {
      formik.handleSubmit();
    };
    logOutHandler();
  }, [triggerLogOut]);

  return { isLoggingOut, error, isError };
};
