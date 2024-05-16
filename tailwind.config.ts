import type { Config } from "tailwindcss";
import daisyui from "daisyui";
import daisyuiThemes from "daisyui/src/theming/themes";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
    themes: [
      {
        light: {
          // ...require("daisyui/src/theming/themes")["light"],
          ...daisyuiThemes["light"],
          primary: "#0ca678", //Teal-7
          secondary: "#1098ad", //Cyan-7
        },
        dark: {
          // ...require("daisyui/src/theming/themes")["dark"],
          ...daisyuiThemes["dark"],
          primary: "#0ca678", //Teal-7
          secondary: "#1098ad", //Cyan-7
        },
      },
    ],
  },

  plugins: [daisyui],
};
export default config;
