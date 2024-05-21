import type { Config } from "tailwindcss";
import daisyui from "daisyui";
import daisyuiThemes from "daisyui/src/theming/themes";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "color-primary": "var(--color-primary)",
        "color-secondary": "var(--color-secondary)",
        "color-tertiary": "var(--color-tertiary)",
      },
      animation: {
        slideDown: "slideDown 0.5s ease-out forwards",
      },
      keyframes: {
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-150px)" },
          "100%": { opacity: "1", transform: "translateY(0px)" },
        },
      },
    },
  },
  daisyui: {
    themes: [
      {
        light: {
          ...daisyuiThemes["light"],
          primary: "#087f5b", //Teal-9
          secondary: "#1098ad", //Cyan-7
        },
        dark: {
          ...daisyuiThemes["dark"],
          primary: "#087f5b", //Teal-9
          secondary: "#1098ad", //Cyan-7",
        },
      },
    ],
  },

  plugins: [daisyui],
};
export default config;

// Dark mode text colors
// --color-primary: #e9ecef; /*primary color for text, border, etc*/
// --color-secondary: #868e96; /*secondary color for text, border, etc*/
// --color-tertiary: #495057; /*tertiary color for text, border, cards etc*/

// Light mode text colors
// --color-primary: #343a40; /*primary color for text, border, etc*/
// --color-secondary: #868e96; /*secondary color for text, border, etc*/
// --color-tertiary: #e9ecef; /*tertiary color for text, border, cards etc*/
