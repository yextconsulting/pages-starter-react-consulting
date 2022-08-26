//@ts-check

(async function() {
  const styleguidePlugin = (await (await import('./tailwind')).styleguidePlugin);

  /** @type {import('tailwindcss/types/config').Config} */
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
          },
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
    plugins: [
      styleguidePlugin(({theme}) => {
        /** @type {import("./tailwind").ComponentDefinitions } */
        const styles = {
          '.Button': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: `${theme('spacing.2')} ${theme('spacing.6')}`,
            fontWeight: theme('fontWeight.bold'),
            borderRadius: '50px',
          },
          '.Button--primary': {
            backgroundColor: theme('colors.brand-primary'),
            color: "white",
            border: "none",
            '&:hover': {
              backgroundColor: theme('colors.brand-secondary'),
              color: "white",
              border: "none",
            }
          },
          '.Button--secondary': {
            backgroundColor: "white",
            color: theme('colors.brand-secondary'),
            border: `2px solid ${theme('colors.brand-primary')}`,
            '&:hover': {
              backgroundColor: theme('colors.brand-secondary'),
              color: "white",
              border: `2px solid ${theme('colors.brand-primary')}`,
            }
          }
        }
        return styles;
    })
    ],
  };
})();