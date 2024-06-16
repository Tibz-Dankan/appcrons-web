"use client";
import { useAppSelector } from "@/hooks/redux";

export const PageAuthWrapper = (PageComponent: React.FC) => {
  return (props: any) => {
    const isLoggedIn = useAppSelector((state) => !!state.auth.accessToken);

    return <div>{isLoggedIn && <PageComponent {...props} />}</div>;
  };
};
