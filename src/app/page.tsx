import { Hero } from "@/app/home/hero";
import Button from "@/app/shared/button";
import Link from "next/link";
import { NavBar } from "@/app/home/navbar";
import { Features } from "@/app/home/features";
import { WhyAppcrons } from "@/app/home/whyAppcrons";

export default function Home() {
  return (
    <div
      className="w-full h-auto space-y-16 p-4 px-4 
       sm:px-16 lg:px-28"
    >
      <Hero>
        <div className="w-full h-full flex flex-col items-center justify-center">
          <NavBar />
          <div
            className="flex items-center justify-center flex-col
            max-w-[768px] gap-5 z-10 mt-[10%]"
          >
            <h1 className="w-full text-5xl font-bold text-center text-color-text-primary">
              Optimize uptime for your free backend instance on
              <Link
                href="https://render.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-[#7048e8] ml-2">Render</span>.
              </Link>
            </h1>
            <p className="text-center text-color-text-secondary text-lg w-4/5">
              Appcrons sends automated requests to prevent annoying cold starts
              and provides the capability to keep within free usage limits.
            </p>
            <Link href="/auth/signup" className="">
              <Button
                label={"Get started"}
                type={"button"}
                className="w-32 bg-primary text-white shadow-md"
              />
            </Link>
          </div>
        </div>
      </Hero>
      <WhyAppcrons />
      <Features />
    </div>
  );
}
