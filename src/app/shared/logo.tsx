import React from "react";

export const Logo: React.FC = () => {
  return (
    <div
      className="relative rounded-[50%] border-[12px] h-16 w-16
       border-primary-light flex items-center justify-center"
    >
      <span className="bg-primary-light h-5 w-5 rounded-[50%]" />
      <span
        className="w-4 h-4 bg-primary-light rounded-[50%]
         absolute top-0 -left-[21px] rotate-[-70deg]"
      />
      <span
        className="w-4 h-4 bg-primary-light rounded-[50%]
         absolute top-0 -right-[21px] rotate-[70deg]"
      />
      <span
        className="w-4 h-4 bg-primary-light rounded-[50%]
         absolute -bottom-[23px] rotate-[-180deg]"
      />
    </div>
  );
};
