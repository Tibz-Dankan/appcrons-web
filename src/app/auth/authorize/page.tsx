import { TAuth } from "@/types/auth";
import React from "react";
import Authorize from "./authorize";

const Page = ({ searchParams }: { searchParams: TAuth }) => {
  return (
    <div>
      <Authorize searchParams={searchParams} />
    </div>
  );
};

export default Page;
