import React from "react";
import Button from "@/app/shared/Button";

interface PostAppExitProps {
  onExit: (exit: boolean) => void;
}

export const PostAppExit: React.FC<PostAppExitProps> = (props) => {
  const postAppExitHandler = () => {
    props.onExit(true);
  };

  return (
    <div
      className="w-[90%] sm:w-96 flex flex-col items-center 
       justify-start gap-4 h-full bg-green-500s flex-1 relative"
    >
      <div className="w-full">
        <p className="w-full text-start">
          Congratulations on successfully creating your application
        </p>
      </div>
      <Button
        onClick={() => postAppExitHandler()}
        label={<span>Finish</span>}
        type={"button"}
        className="absolute -bottom-7 right-0 h-auto py-1"
      />
    </div>
  );
};
