import React, { ReactNode } from "react";
import { ThemeProvider } from "next-themes";

interface ThemeAppProvider {
  children: ReactNode;
}

export const ThemeAppProvider: React.FC<ThemeAppProvider> = (props) => {
  return (
    <ThemeProvider
      disableTransitionOnChange
      defaultTheme="system"
    >
      {props.children}
    </ThemeProvider>
  );
};
