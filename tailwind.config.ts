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
        primaryBg: "#ffffff",
        secondaryBg: "#f78a79",
        textPrimary: "#394a59",
        textSecondary: "#ffffff",
        textTernary: "#f78a79",
        borderColor: "#cfcfcf",
        placeholderColor: "#707070",
        warningColor: "#DB8794",
      },
      maxWidth: {
        max: "1560px",
      },
      boxShadow: {
        ShadowBox: "0px -10px 50px 0px rgba(0, 0, 0, 0.25)",
        inputShadow: "0px 4px 28.1px 0px rgba(178, 178, 178, 0.25)",
      }
    },
  },
  plugins: [],
};
export default config;
