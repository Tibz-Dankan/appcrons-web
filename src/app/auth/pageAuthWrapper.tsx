"use client";
import { useAppSelector } from "@/hooks/redux";

export const PageAuthWrapper = (PageComponent: React.FC) => {
  const isLoggedIn = useAppSelector((state) => !!state.auth.accessToken);

  return (props: any) => {
    return <div>{isLoggedIn && <PageComponent {...props} />}</div>;
  };
};
