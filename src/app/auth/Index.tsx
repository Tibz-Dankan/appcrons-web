"use client";

import React, { useEffect } from "react";
import { TAuth } from "@/types/auth";
import { useAppDispatch } from "@/hooks/redux";
import { authActions } from "@/store";

interface AuthenticateClientProps {
  session: TAuth;
}

export const AuthenticateClient: React.FC<AuthenticateClientProps> = (
  props
) => {
  const dispatch = useAppDispatch();
  const session = props.session;

  // TODO: to implement auto logout functionality
  useEffect(() => {
    const authenticateClient = async () => {
      dispatch(authActions.authenticate(session));
    };
    authenticateClient();
  }, [dispatch]);

  return <></>;
};
