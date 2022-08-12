module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}", "./node_modules/@yext/search-ui-react/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "brand-primary": "var(--brand-primary)",
        "brand-secondary": "var(--brand-secondary)",
        "brand-gray": {
          100: "#F7F7F7",
          200: "#EDEDED",
          300: "#CCC",
          400: "#767676",
        }
      },
      fontFamily: {
        primary: "var(--font-family-primary)",
        secondary: "var(--font-family-secondary)",
      },
      links: {
        primary: {
          color: "var(--link-primary-color)",
          hoverColor: "var(--link-primary-color-hover)",
        },
        secondary: {
          color: "var(--link-secondary-color)",
          hoverColor: "var(--link-secondary-color-hover)",
        }
      },
      buttons: {
        borderRadius: "var(--button-border-radius)",
        primary: {
          background: "var(--button-primary-background-color)",
          text: "var(--button-primary-color)",
          border: "var(--button-primary-border)",
          hoverBackground: "var(--button-primary-background-color-hover)",
          hoverText: "var(--button-primary-color-hover)",
          hoverBorder: "var(--button-primary-border-hover)",
        },
        secondary: {
          background: "var(--button-secondary-background-color)",
          text: "var(--button-secondary-color)",
          border: "var(--button-secondary-border)",
          hoverBackground: "var(--button-secondary-background-color-hover)",
          hoverText: "var(--button-secondary-color-hover)",
          hoverBorder: "var(--button-secondary-border-hover)",
        }
      },
      headings: {
        sub: ['1.5rem', { lineHeight: '1.25' }],
        subMobile: ['1.375rem', { lineHeight: '1.27' }],
        head: ['2.125rem', { lineHeight: '1.18' }],
        headMobile: ['1.5rem', { lineHeight: '1.33' }],
        lead: ['3rem', { lineHeight: '1.33' }],
        leadMobile: ['1.75rem', { lineHeight: '1.14' }],
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
      }
    },
  },
  plugins: [],
};
