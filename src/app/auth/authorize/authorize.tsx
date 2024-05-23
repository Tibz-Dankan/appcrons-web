import { Session } from "@/lib/session";
import { TAuth } from "@/types/auth";
import React from "react";
import { redirect } from "next/navigation";

const Authorize = async ({ searchParams }: { searchParams: TAuth }) => {
  const { accessToken, user } = searchParams;
  console.log("server accessToken: ", accessToken);
  console.log("server user: ", user);

  new Session().create(searchParams);
  redirect("/dashboard");

  return (
    <div>
      <pre>{JSON.stringify(searchParams, null, 2)}</pre>
    </div>
  );
};

export default Authorize;
