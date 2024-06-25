import React, { ReactNode } from "react";
import { Grid } from "@/app/shared/grid";

interface HeroProps {
  children: ReactNode;
}

export const Hero: React.FC<HeroProps> = (props) => {
  return (
    <header className="w-full h-[100vh] relative bg-transparent">
      <div className="w-full h-full">{props.children}</div>
      <div className="w-full h-full absolute top-0 left-0 z-[-100]">
        <Grid />
      </div>
      <div className="w-4/5 h-4/5 absolute top-[25%] left-[10%] z-0 opacity-50">
        <Grid
          rows={4}
          columns={8}
          style={{
            background: `radial-gradient(rgba(22,27,34,0.1), rgba(22,27,34,0.2), 
            rgba(22,27,34,0.2), rgba(22,27,34,0.2), rgba(22,27,34,0.4),
            rgba(28,126,214,0.3), rgba(28,126,214,0.8))`,
          }}
          className="z-[1]"
        />
      </div>
    </header>
  );
};
