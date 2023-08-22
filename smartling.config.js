export const locales = ["en", "es"];

const config = {
  // Global Parameters
  // Locales should be in the format "fr-CA" NOT "fr_CA"
  // If Smartling & Yext have different names, i.e. Yext-'en' Smartling-'en-US', use the Yext locale here & update `smartlingToYextLocaleMapping` below
  locales,

  // Smartling Parameters
  userID: "toqujwutaejksvdrrnpbdihbkqooor",
  userSecret: "l20d2t5l6nd48vpemgr0fite41El!dr05p4nclp9qt5p3hfqnkt5kbk",
  projectID: "7b244c6c4", // Found in the Smartling URL: https://dashboard.smartling.com/app/projects/[PROJECT_ID]
  defaultLocale: "en",
  smartlingLocaleToYextLocaleMapping: {
    // Mapping of Smartling locale code to Yext locale codes. Example:
    // "zh-CN": ["zh_Hans"],
  },
};

export default config;
