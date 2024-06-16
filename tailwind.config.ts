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
        secondary: "#1098ad", //Cyan-7
        "color-text-primary": "var(--color-text-primary)",
        "color-text-secondary": "var(--color-text-secondary)",
        "color-border-primary": "var(--color-border-primary)",
        "color-bg-primary": "var(--color-bg-primary)",
        "color-bg-secondary": "var(--color-bg-secondary)",
        "color-bg-tertiary": "var(--color-bg-tertiary)",
        "color-divide-primary":"var(--color-divide-primary)"
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
  plugins: [],
};
export default config;
