"use client";
import { TAuth } from "@/types/auth";

export const getUserId = (): string => {
  const session = JSON.parse(localStorage.getItem("session")!) as TAuth;
  if (!session) return "";

  return session.user.id;
};
