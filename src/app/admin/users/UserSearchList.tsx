"use client";

import React from "react";
import { truncateString } from "@/utils/truncateString";
import { clientURL } from "@/constants";
import { useRouter } from "@/lib/router-events";
import { ToolTip } from "@/app/shared/ToolTip";
import { InfoIcon } from "@/app/shared/Icons/InfoIcon";
import { useGetWindowWidth } from "@/hooks/UseGetWindowWidth";
import { useSearchParams, useRouter as useNativeRouter } from "next/navigation";
import { CloseIcon } from "@/app/shared/Icons/CloseIcon";
import { TUserAPIData } from "@/types/admin";
import { AppDate } from "@/utils/date";

interface UserSearchListProps {
  users: TUserAPIData[];
  onClose: (isClosed: boolean) => void;
}

export const UserSearchList: React.FC<UserSearchListProps> = (props) => {
  const router = useRouter();
  const nativeRouter = useNativeRouter();
  const users = props.users;
  const searchParams = useSearchParams();
  const { width } = useGetWindowWidth();

  const isLastElement = (list: any[], index: number): boolean => {
    return index === list.length - 1;
  };

  const navigateToUsersPage = (userId: string) => {
    router.push(`${clientURL}/admin/users/${userId}`);
  };

  const closeSearchResultHandler = () => {
    props.onClose(true);
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.delete("query");
    nativeRouter.push(`?${currentParams.toString()}`, { scroll: false });
  };

  const showToolTip: boolean = width >= 450;

  const searchResultCount = users.length;
  const searchQuery = searchParams.get("query")!;

  if (searchResultCount === 0) {
    return (
      <div
        className="w-full pb-4 sm:pb-8 relative flex items-center 
         justify-between gap-4"
      >
        <p className="text-xl w-/5">
          {searchResultCount} search results for "
          {truncateString(searchQuery, 40)}"
        </p>
        <span
          className="cursor-pointer"
          onClick={() => closeSearchResultHandler()}
        >
          <CloseIcon className="w-6 h-6" />
        </span>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <div
        className="w-full pb-4 sm:pb-8 relative flex items-center 
        justify-between gap-4"
      >
        <p className="text-xl w-/5">
          {searchResultCount} search results for "
          {truncateString(searchQuery, 40)}"
        </p>
        <span
          className="cursor-pointer"
          onClick={() => closeSearchResultHandler()}
        >
          <CloseIcon className="w-6 h-6" />
        </span>
      </div>
      <table
        className="border-separate border-spacing-0 w-full
         overflow-x-auto"
      >
        <thead>
          <tr
            className="[&>*]:bg-color-bg-secondary [&>*]:border-y-[1px] 
            [&>*]:border-color-border-primary text-sm"
          >
            <th
              className="px-2 pl-4 py-4 text-start border-l-[1px] 
              border-color-border-primary rounded-tl-md"
            >
              <span>
                <span>Username</span>
              </span>
            </th>
            <th className="px-2 py-4 text-start">
              <span>Email</span>
            </th>
            <th className="px-2 py-4 text-start">
              <span>Role</span>
            </th>
            <th className="px-2 py-4 text-start">
              <div className="flex items-center gap-2">
                <span>Apps</span>
                {showToolTip && (
                  <span data-tooltip-id="total-apps">
                    <InfoIcon className="w-[18px] h-[18px]" />
                  </span>
                )}
                <ToolTip
                  id={"total-apps"}
                  content={
                    <span className="text-sm font-[500]">
                      Total number of apps for this user
                    </span>
                  }
                />
              </div>
            </th>
            <th className="px-2 py-4 text-start">
              <div className="flex items-center gap-2">
                <span>Created</span>
              </div>
            </th>
            <th
              className="px-2 py-4 text-start border-r-[1px] 
              border-color-border-primary rounded-tr-md"
            >
              <div className="flex items-center gap-2">
                <span>Updated</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr
                className="h-14s h-12 [&>*]:border-b-[1px] 
                &>*]:border-color-border-primary text-sm"
                key={index}
                onClick={() => navigateToUsersPage(user.id)}
              >
                <td
                  className={`px-2 pl-4 border-l-[1px] 
                  border-color-border-primary cursor-pointer
                  ${isLastElement(users, index) && "rounded-bl-md"}`}
                >
                  <span className="underline">{user.name}</span>
                </td>
                <td className="px-2 cursor-pointer">
                  <span>{user.email}</span>
                </td>
                <td className="px-2 cursor-pointer">
                  <span className="uppercase">{user.role}</span>
                </td>
                <td className="px-2">{user.appCount}</td>
                <td className="px-2">
                  {new AppDate(user.createdAt).shortMonthDayYear()}
                </td>
                <td
                  className={`px-2 border-r-[1px] border-color-border-primary
                  ${isLastElement(users, index) && "rounded-br-md"}`}
                >
                  {new AppDate(user.updatedAt).shortMonthDayYear()}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
