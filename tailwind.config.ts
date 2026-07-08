import type { Config } from "tailwindcss";
import styleguide from "./styleguidePlugin";

export default {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./node_modules/@yext/search-ui-react/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: "'Arial','Helvetica','sans-serif','system'",
        secondary: "'Arial','Helvetica','sans-serif','system'",
        gotham: ["Gotham Medium"],
        legend: ["Legend Sans Serif"],
        oldStandard: ["Old Standard"],
      },
      fontSize: {
        sm: ["14px", "22px"],
        base: ["16px", "24px"],
        lg: ["18px", "18px"],
        "2xl": ["24px", "32px"],
        "3xl": ["29px", "29px"],
        "4xl": ["40px", "40px"],
        "5xl": ["50px", "56px"],
      },
      colors: {
        "brand-primary": "#095587",
        "brand-secondary": "#F4D34C",
        "brand-white": "#FFFFFF",
        "brand-gray": {
          100: "#F7F7F7",
          200: "#EDEDED",
          300: "#CCC",
          400: "#767676",
        },
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
        },
      },
      boxShadow: {
        "brand-shadow": "0 -1px 0 0 #CCC inset",
      },
    },
  },
  plugins: [styleguide],
} as Config;
