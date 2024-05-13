import type { Config } from "tailwindcss";
import daisyui from "daisyui";

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
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#0ca678", //Teal-7
          secondary: "#1098ad", //Cyan-7
        },
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          primary: "#0ca678", //Teal-7
          secondary: "#1098ad", //Cyan-7
        },
      },
    ],
  },

  plugins: [daisyui],
};
export default config;
