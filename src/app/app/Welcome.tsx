import React from "react";
import { PostAppLayout } from "./PostAppLayout";
import Button from "../shared/Button";
import { PlusIcon } from "../shared/Icons/PlusIcon";

export const Welcome: React.FC = () => {
  return (
    <div
      className="w-4/5 max-w-[700px] border-[1px] 
      border-color-border-primary rounded-lg p-8  text-center space-y-8"
    >
      <div>
        <h2 className="text-2xl">Welcome to Appcrons!</h2>
        <p className="mt-2">
          Thank you for signing up! You're just one step away from ensuring your
          free backend servers stay awake and responsive.
        </p>
      </div>
      <div>
        <p>
          Get Started by adding your first application to Appcrons. This will
          allow us to make periodic requests and prevent your servers from
          shutting down due to inactivity.
        </p>
      </div>
      <div className="flex items-center justify-center">
        <PostAppLayout
          postLabel={
            <Button
              type="button"
              label={
                <div className="flex items-center justify-center gap-2">
                  <PlusIcon className="text-gray-200 h-6 w-6" />
                  <span>New Application</span>
                </div>
              }
              className="h-auto pl-3"
            />
          }
        />
      </div>
    </div>
  );
};
