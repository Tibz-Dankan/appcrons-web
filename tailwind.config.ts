import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#087f5b", //Teal-9
        "primary-light": "#0ca678", //Teal-7
        secondary: "#1098ad", //Cyan-7
        "color-text-primary": "var(--color-text-primary)",
        "color-text-secondary": "var(--color-text-secondary)",
        "color-border-primary": "var(--color-border-primary)",
        "color-bg-primary": "var(--color-bg-primary)",
        "color-bg-secondary": "var(--color-bg-secondary)",
        "color-bg-tertiary": "var(--color-bg-tertiary)",
        "color-divide-primary": "var(--color-divide-primary)",
        "header-tab-bg": "var(--color-header-tab-bg-active)",
        "header-tab-text": "var(--color-header-tab-text-active)",
        "color-skeleton-bg": "var(--color-skeleton-bg)",
        "color-skeleton-from": "var(--color-skeleton-from)",
        "color-skeleton-to": "var(--color-skeleton-to)",
        "color-skeleton-via": "var(--color-skeleton-via)",
        success: "#55C57A",
        error: "#D9534F",
        info: "#5BC0DE",
        warning: "#F0AD4E",
      },
      animation: {
        slideDown: "slideDown 0.5s ease-out forwards",
        slideUp: "slideUp 0.5s ease-in-out forwards",
        spin: "spin 1.5s linear infinite",
        moveInnerLoaderToRight: "moveInnerLoaderToRight 1s infinite ease-out",
        heightZeroToFull: "heightZeroToFull 0.5s ease-out forwards",
        opacityZeroToFull: "opacityZeroToFull 0.5s ease-out forwards",
      },
      keyframes: {
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-150px)" },
          "100%": { opacity: "1", transform: "translateY(0px)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(50px)" },
          "100%": { opacity: "1", transform: "translateY(0px)" },
        },
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        moveInnerLoaderToRight: {
          "0%": { left: "0%" },
          "100%": { left: "45%" },
        },
        heightZeroToFull: {
          "0%": { height: "0%", opacity: "0" },
          "100%": { height: "100%", opacity: "1" },
        },
        opacityZeroToFull: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
