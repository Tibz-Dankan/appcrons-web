import { Session } from "@/lib/session";
import { getFirstLetter } from "@/utils/getFirstLetter";
import React from "react";

export const CurrentUser: React.FC = () => {
  const session = new Session().get();
  if (!session) {
    return <span>No User</span>;
  }

  const user = session.user;
  return (
    <div>
      <span
        className="cursor-pointer grid place-items-center  bg-gray-300s p-1
        w-10 h-10 rounded-[50%] text-gray-100 first-letter:uppercase text-xl
        bg-gradient-to-r from-cyan-700 via-teal-900  to-blue-600
        font-semibold"
      >
        {getFirstLetter(user.name)}
      </span>
    </div>
  );
};
