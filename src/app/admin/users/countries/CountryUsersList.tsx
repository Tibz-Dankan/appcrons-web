"use client";

import React from "react";
import { clientURL } from "@/constants";
import { useRouter } from "@/lib/router-events";
import { TCountryDistributionUser } from "@/types/admin";
import { AppDate } from "@/utils/date";

interface CountryUsersListProps {
  users: TCountryDistributionUser[];
}

export const CountryUsersList: React.FC<CountryUsersListProps> = (props) => {
  const router = useRouter();
  const users = props.users;

  const navigateToUserPage = (userId: string) => {
    router.push(`${clientURL}/admin/users/${userId}`);
  };

  if (users.length === 0) {
    return (
      <div
        className="bg-color-bg-secondary/40 px-4 py-3 text-sm
        text-color-text-secondary"
      >
        No users in this country.
      </div>
    );
  }

  return (
    <div className="bg-color-bg-secondary/40 px-4 py-3 overflow-x-auto">
      <table className="w-full border-separate border-spacing-0 text-sm">
        <thead>
          <tr
            className="[&>*]:text-color-text-secondary [&>*]:font-medium
            text-xs"
          >
            <th className="px-2 py-2 text-start">Username</th>
            <th className="px-2 py-2 text-start">Email</th>
            <th className="px-2 py-2 text-start">Role</th>
            <th className="px-2 py-2 text-start">Joined</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr
                className="h-10 [&>*]:border-t-[1px]
                [&>*]:border-color-border-primary cursor-pointer
                hover:opacity-80"
                key={index}
                onClick={() => navigateToUserPage(user.id)}
              >
                <td className="px-2">{user.name}</td>
                <td className="px-2">{user.email}</td>
                <td className="px-2 uppercase">{user.role}</td>
                <td className="px-2 whitespace-nowrap">
                  {new AppDate(user.createdAt).shortMonthDayYear()}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
