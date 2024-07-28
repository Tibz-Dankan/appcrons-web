import React from "react";
import Image from "next/image";
import Link from "next/link";
import { TwitterIcon } from "@/app/shared/Icons/TwitterIcon";
import { LinkedInIcon } from "@/app/shared/Icons/LinkedInIcon";
import { GithubIcon } from "@/app/shared/Icons/GithubIcon";

export const CreatorsWords: React.FC = () => {
  return (
    <section className="w-full mt-16 space-y-16">
      <div className="w-full text-center space-y-2">
        <p className="text-3xl font-semibold">Creator</p>
        <p className="text-color-text-secondary text-base">
          A Word from the Creator
        </p>
      </div>
      <div className="w-full flex items-start justify-center gap-4">
        <div className="w-full">
          <p>
            "As a developer, I faced the frustration of slow cold starts with
            Render's free tier. Appcrons was born out of the need to keep my
            applications responsive and within free usage limits. It's a
            solution by developers, for developers." – John Doe
          </p>
        </div>
        <div
          className="w-full space-y-4 border-[1px] border-color-border-primary 
          rounded-xl p-4"
        >
          <div className="flex items-center gap-4">
            <Image
              src="/dankan.png"
              width={60}
              height={60}
              alt="Tibesigwa-Dankan"
              className="w-20s h-autos rounded-[50%] shadow-md"
            />
            <div className="flex flex-col gap-2">
              <span className="text-xl text-color-text-primary">
                Tibesigwa Dankan
              </span>
              <span className="text-color-text-secondary">
                Fullstack developer
              </span>
            </div>
          </div>
          <ul className="flex items-center gap-3">
            <li>
              <Link
                href="https://github.com/Tibz-Dankan"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubIcon className="w-8 h-8" />
              </Link>
            </li>
            <li>
              <Link
                href="https://www.linkedin.com/in/tibesigwadankan"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedInIcon className="w-7 h-7" />
              </Link>
            </li>
            <li>
              <Link
                href="https://x.com/TibzDankan"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TwitterIcon className="w-7 h-7 p-1 text-white bg-black rounded" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
