import { TUserAPIData } from "@/types/admin";
import { elapsedTime } from "@/utils/elapsedTime";
import React from "react";

interface UserDetailsCardProps {
  user: TUserAPIData;
}

export const UserDetailsCard: React.FC<UserDetailsCardProps> = (props) => {
  const user = props.user;

  return (
    <div className="w-fulls flex items-start gap-6">
      <div
        className="flex items-center justify-center bg-primary/20
        rounded-full w-20 h-20"
      >
        <span className="text-primary text-2xl font-bold">
          {user.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .slice(0, 2)}
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xl font-bold text-color-text-primary">
          {user.name}
        </span>
        <span className="text-sm text-color-text-secondary">{user.email}</span>
        <span
          className="text-sm text-color-text-secondary flex items-center
          gap-2"
        >
          <span>Created: {elapsedTime(user.createdAt)}</span>
          <span className="bg-color-text-secondary w-1 h-1 rounded-full"></span>
          <span>Updated: {elapsedTime(user.updatedAt)}</span>
        </span>
      </div>
    </div>
  );
};
