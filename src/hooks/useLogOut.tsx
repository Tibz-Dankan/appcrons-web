import { useEffect } from "react";
import { useRouter } from "@/lib/router-events";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { AuthService } from "@/services/auth.service";
import {
  hideCardNotification,
  showCardNotification,
} from "@/store/actions/notification";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import { logout } from "@/store/actions/auth";
import { jwtDecode } from "jwt-decode";

type TLogOut = { triggerLogOut: boolean };

export const useLogOut = ({ triggerLogOut }: TLogOut) => {
  const router = useRouter();
  const dispatch: any = useAppDispatch();
  const accessToken = useAppSelector((state) => state.auth.accessToken);

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

  // Log out user onClick
  useEffect(() => {
    if (!triggerLogOut) return;

    const logOutHandler = () => {
      formik.handleSubmit();
    };
    logOutHandler();
  }, [triggerLogOut]);

  // Log out user automatically when JWT is expired
  useEffect(() => {
    const tryLogOut = () => {
      const decodedToken = jwtDecode(accessToken);
      const tokenExpiration = decodedToken.exp! * 1000;
      const isExpired = new Date(tokenExpiration) <= new Date(Date.now());

      if (!isExpired) return;
      formik.handleSubmit();
    };
    const logOutTimerInterval = setInterval(tryLogOut, 60000);

    return () => clearInterval(logOutTimerInterval);
  }, []);

  return { isLoggingOut, error, isError };
};
