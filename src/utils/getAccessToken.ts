"use client";
import { TAuth } from "@/types/auth";

export const getAccessToken = (): string => {
  const session = JSON.parse(localStorage.getItem("session")!) as TAuth;
  if (!session) return "";

  return session.accessToken;
};
