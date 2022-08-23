module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}", "./node_modules/@yext/search-ui-react/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "text": "black",
        "brand-primary": "#1B78D0",
        "brand-secondary": "#073866",
        "brand-gray": {
          100: "#F7F7F7",
          200: "#EDEDED",
          300: "#CCC",
          400: "#767676",
        }
      },
      fontFamily: {
        primary: "'Arial','Helvetica','sans-serif','system'",
        secondary: "'Arial','Helvetica','sans-serif','system'",
      },
      links: ({ theme }) => ({
        primary: {
          color: theme('colors.brand-primary'),
          hoverColor: theme('colors.brand-secondary'),
        },
        secondary: {
          color: theme('colors.brand-secondary'),
          hoverColor: theme('colors.brand-primary'),
        }
      }),
      buttons: ({ theme }) => ({
        borderRadius: "50px",
        primary: {
          background: theme('colors.brand-primary'),
          color: "white",
          border: "none",
          hoverBackground: theme('colors.brand-secondary'),
          hoverColor: "white",
          hoverBorder: "none",
        },
        secondary: {
          background: "white",
          color: theme('colors.brand-secondary'),
          border: `2px solid ${theme('colors.brand-primary')}`,
          hoverBackground: theme('colors.brand-secondary'),
          hoverColor: "white",
          hoverBorder: `2px solid ${theme('colors.brand-primary')}`,
        }
      }),
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