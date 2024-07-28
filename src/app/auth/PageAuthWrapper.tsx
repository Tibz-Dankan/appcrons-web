"use client";

import React from "react";
import { useAppSelector } from "@/hooks/redux";

export const PageAuthWrapper = (PageComponent: React.FC) => {
  const AuthComponent: React.FC = (props) => {
    const isLoggedIn = useAppSelector((state) => !!state.auth.accessToken);

    return <div>{isLoggedIn && <PageComponent {...props} />}</div>;
  };

  return AuthComponent;
};
