"use server";

import { Session } from "@/lib/session";

export const clearSession = async () => {
  new Session().clear();
};
