import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        primary: "#0ca678",
        primaryLight: "#96f2d7",
        primaryDark: "#087f5b",
        "gray-opacity": "rgba(0, 0, 0, 0.15)",
        info: "#5BC0DE",
        warning: "#F0AD4E",
        error: "#f03e3e",
        success: "#55C57A",
      },
      animation: {
        slideDown: "slideDown 0.5s ease-out forwards",
        moveInnerLoaderToRight: "moveInnerLoaderToRight 0.8s infinite ease-out",
      },
      keyframes: {
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-150px)" },
          "100%": { opacity: "1", transform: "translateY(0px)" },
        },
        moveInnerLoaderToRight: {
          "0%": { left: "0%" },
          "100%": { left: "45%" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
