import plugin from "tailwindcss/plugin";

export default plugin(({ addComponents, theme }) => {
  addComponents({
    ".btn": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "50px",
      padding: `${theme("spacing.2")} ${theme("spacing.6")}`,
      fontWeight: theme("fontWeight.bold"),
    },
    ".btn-primary": {
      backgroundColor: theme("colors.brand-primary"),
      color: "white",
      border: `2px solid ${theme("colors.brand-primary")}`,
      "&:hover": {
        backgroundColor: theme("colors.brand-secondary"),
        color: "white",
        border: `2px solid ${theme("colors.brand-secondary")}`,
      },
    },
    ".btn-secondary": {
      backgroundColor: "white",
      color: theme("colors.brand-secondary"),
      border: `2px solid ${theme("colors.brand-primary")}`,
      "&:hover": {
        backgroundColor: theme("colors.brand-secondary"),
        color: "white",
        border: `2px solid ${theme("colors.brand-primary")}`,
      },
    },
    ".heading": {
      fontFamily: theme("fontFamily.primary"),
      fontWeight: theme("fontWeight.bold"),
    },
    ".heading-lead": {
      fontSize: "1.75rem",
      lineHeight: "1.14",
      "@screen sm": {
        fontSize: "3rem",
        lineHeight: "1.33",
      },
    },
    ".heading-head": {
      fontSize: "1.5rem",
      lineHeight: "1.33",
      "@screen sm": {
        fontSize: "2.125rem",
        lineHeight: "1.18",
      },
    },
    ".heading-sub": {
      fontSize: "1.25rem",
      lineHeight: "1.4",
      "@screen sm": {
        fontSize: "1.5rem",
        lineHeight: "1.25",
      },
    },
    ".link-primary": {
      color: theme("colors.brand-primary"),
      "&:hover": {
        color: theme("colors.brand-secondary"),
      },
    },
    ".link-secondary": {
      color: theme("colors.brand-secondary"),
      "&:hover": {
        color: theme("colors.brand-primary"),
      },
    },
    ".link-breadcrumbs": {
      color: theme("colors.brand-primary"),
      fontWeight: theme("fontWeight.bold"),
    },
    ".link-underline": {
      textDecoration: "underline",
      "&:hover": {
        textDecoration: "none",
      },
    },
  });
});
