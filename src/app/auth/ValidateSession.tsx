"use client";

// import { useRouter } from "next/router";
import { useRouter } from "next/navigation";

import { jwtDecode } from "jwt-decode";
import { TAuth } from "@/types/auth";
import { useEffect, useState } from "react";

export const ValidateSession = (): any => {
  const router = useRouter();

  //   const currentURL = router.asPath;
  //   const currentPath = router.;
  //   const currentPath = window.location.pathname;

  const [currentPath, setPath] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPath(window.location.pathname);
    }
  }, []);

  console.log("currentPath:::", currentPath);

  if (currentPath.startsWith("/auth" || "/docs") || currentPath == "/") {
    return;
  }

  const session = localStorage && localStorage.getItem("session");
  if (!session) {
    router.push("/auth/login");
    return;
  }

  const parsedSession = JSON.parse(session) as TAuth;
  const accessToken = parsedSession.accessToken;

  console.log("accessToken: ", accessToken);
  const decodedToken = jwtDecode(accessToken);
  console.log(decodedToken);
  const tokenExpiresInSeconds = decodedToken.exp;
  const isTokenExpired = new Date() > new Date(tokenExpiresInSeconds! * 1000);

  if (isTokenExpired) {
    localStorage.clear();
    router.push("/auth/login");
    return;
  }

  return <></>;
};
