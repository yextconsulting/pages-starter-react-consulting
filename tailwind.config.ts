import type { Config } from "tailwindcss";
import type { PluginAPI } from "tailwindcss/types/config";
import { ButtonConfig, HeadingConfig, LinkConfig } from "./tailwind";
import { styleguidePlugin } from "./tailwindPlugin";

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
      },
      fontSize: {
        sm: ["14px", "22px"],
        base: ["16px", "24px"],
        lg: ["18px", "24px"],
      },
      colors: {
        text: "black",
        "brand-primary": "#1B78D0",
        "brand-secondary": "#073866",
        "brand-gray": {
          100: "#F7F7F7",
          200: "#EDEDED",
          300: "#CCC",
          400: "#767676",
        },
      },
      buttons: (theme: PluginAPI["theme"]): ButtonConfig => ({
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: `${theme("spacing.2")} ${theme("spacing.6")}`,
        fontWeight: theme("fontWeight.bold"),
        borderRadius: "50px",
        variants: {
          primary: {
            backgroundColor: theme("colors.brand-primary"),
            color: "white",
            border: "none",
          },
          secondary: {
            backgroundColor: "white",
            color: theme("colors.brand-secondary"),
            border: `2px solid ${theme("colors.brand-primary")}`,
            "&:hover": {
              backgroundColor: theme("colors.brand-secondary"),
              color: "white",
              border: `2px solid ${theme("colors.brand-primary")}`,
            },
          },
        },
      }),
      headings: (theme: PluginAPI["theme"]): HeadingConfig => ({
        fontFamily: theme("fontFamily.primary"),
        fontWeight: theme("fontWeight.bold"),
        variants: {
          sub: {
            fontSize: "1.25rem",
            lineHeight: "1.4",
            "@screen sm": {
              fontSize: "1.5rem",
              lineHeight: "1.25",
            },
          },
          head: {
            fontSize: "1.5rem",
            lineHeight: "1.33",
            "@screen sm": {
              fontSize: "2.125rem",
              lineHeight: "1.18",
            },
          },
          lead: {
            fontSize: "1.75rem",
            lineHeight: "1.14",
            "@screen sm": {
              fontSize: "3rem",
              lineHeight: "1.33",
            },
          },
        },
      }),
      links: (theme: PluginAPI["theme"]): LinkConfig => ({
        variants: {
          primary: {
            color: theme("colors.brand-primary"),
            "&:hover": {
              color: theme("colors.brand-secondary"),
            },
          },
          secondary: {
            color: theme("colors.brand-secondary"),
            "&:hover": {
              color: theme("colors.brand-primary"),
            },
          },
          breadcrumbs: {
            color: theme("colors.brand-primary"),
            fontWeight: theme("fontWeight.bold"),
          },
          underline: {
            textDecoration: "underline",
            "&:hover": {
              textDecoration: "none",
            },
          },
          underlineInverse: {
            textDecoration: "none",
            "&:hover": {
              textDecoration: "underline",
            },
          },
        },
      }),
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
  plugins: [styleguidePlugin()],
} as Config;
