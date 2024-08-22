import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      height: {
        "146": "146px",
        "30": "30px",
        "34": "34px",
        "70": "70px",
        "22": "22px",
        "26": "26px",
        "100": "100px",
        "200": "200px",
      },
      maxWidth: {
        "860": "860px",
        "400": "400px",
      },
      width: {
        "95%": "95%",
        "70%": "70%",
        "15%": "15%",
      },
      minHeight: {
        "60vh": "60vh",
      },
      maxHeight: {
        "400": "400px",
        "460": "460px",
      },
    },
  },
  plugins: [],
};
export default config;
