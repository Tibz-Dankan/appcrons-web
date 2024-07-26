"use client";

import React from "react";
import { TPageLink } from "@/types/page";
import { SettingsPageLayout } from "@/app/layouts/settingsPageLayout";
import { UpdatePersonalDetails } from "@/app/auth/updatePersonalDetails";
import { ChangePassword } from "@/app/auth/changePassword";
import { DeleteAccount } from "@/app/auth/deleteAccount";
import { PageAuthWrapper } from "@/app/auth/pageAuthWrapper";

const Settings: React.FC = () => {
  const pageLinks: TPageLink[] = [
    {
      linkName: "Personal Details",
      linkValue: "settings#edit-personal-details",
      linkComponent: <UpdatePersonalDetails />,
    },
    {
      linkName: "Change password",
      linkValue: "settings#change-password",
      linkComponent: <ChangePassword />,
    },
    {
      linkName: "Delete account",
      linkValue: "settings#delete-account",
      linkComponent: <DeleteAccount />,
    },
  ];

  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full p-10 max-w-[1280px] min-h-[70vh] mt-6">
        <SettingsPageLayout pageLabel="Settings" pageLinks={pageLinks} />
      </div>
    </div>
  );
};

export default PageAuthWrapper(Settings);
