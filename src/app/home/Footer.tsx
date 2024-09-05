import React from "react";
import Image from "next/image";
import Link from "next/link";

export const Footer: React.FC = () => {
  return (
    <footer
      className="h-[50vh] w-full mt-16 space-y-6 bg-blue-500s pt-4
      flex flex-col items-center justify-center"
    >
      <div className="w-full flex items-center justify-center">
        <div className="w-10">
          <Image src="/logo.png" width={30} height={30} alt="logo" />
        </div>
        <span
          className="text-color-text-primary 
          font-[500] text-xl"
        >
          Appcrons
        </span>
      </div>
      <div className="space-y-2">
        <div
          className="flex items-center justify-center text-color-text-secondary
           space-x-1 text-sm"
        >
          <span>&copy;</span>
          <span>{new Date().getFullYear()}</span>
          <span>Appcrons.</span>
          <span>All rights reserved.</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          {/* <div className="flex items-start justify-center text-color-text-secondary">
            Contact Us
          </div> */}
          <Link href="/docs" className="flex items-start justify-center">
            <span className="text-color-text-secondary">Documentation</span>
          </Link>
          {/* <Link href="/caution" className="flex items-start justify-center">
            <span className="text-color-text-secondary">Caution</span>
          </Link> */}
        </div>
      </div>
    </footer>
  );
};
