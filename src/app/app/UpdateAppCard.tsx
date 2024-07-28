import React from "react";
import { TApp } from "@/types/app";
import { UpdateApp } from "@/app/app/UpdateApp";
import { Modal } from "@/app/shared/Modal";
import { EditIcon } from "@/app/shared/Icons/EditIcon";

interface UpdateAppCardProps {
  app: TApp;
}

export const UpdateAppCard: React.FC<UpdateAppCardProps> = (props) => {
  const app = props.app;

  return (
    <div
      className="flex items-center justify-between border-[1px]
       border-color-border-primary rounded-md p-8"
    >
      <div className="flex flex-col gap-2 ">
        <p className="text-xl text-color-text-primary">
          <span>Update Application Info</span>
        </p>
        <p>
          <span className="text-color-text-secondary">
            You can update the details of your application to ensure everything
            is accurate and up-to-date.
          </span>
        </p>
      </div>
      <div
        className="border-[1px] border-color-border-primary
         rounded px-4 py-2 bg-color-bg-secondary"
      >
        <Modal
          openModalElement={
            <p className="flex items-center gap-2 cursor-pointer">
              <EditIcon
                className="w-[18px] h-[18px] text-color-text-secondary 
                 cursor-pointer"
              />
              <span className="text-sm">Update</span>
            </p>
          }
        >
          <UpdateApp app={app} onUpdate={() => {}} />
        </Modal>
      </div>
    </div>
  );
};
