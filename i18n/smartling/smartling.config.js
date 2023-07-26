/* eslint-disable import/no-anonymous-default-export */
export default {
  // Global Parameters
  // Locales should be in the format "fr-CA" NOT "fr_CA"
  // If Smartling & Yext have different names, i.e. Yext-'en' Smartling-'en-US', use the Yext locale here & update `smartlingToYextLocaleMapping` below
  locales: ["en"],

  // Smartling Parameters
  userID: "pphkibrhtdomfiobhbiemoyiodtrnf",
  userSecret: "d6v7sivmgskok04116vmkbcpfhUj.k4vv27t05jo9hpb727e7h1iv7h",
  projectID: "", // Found in the Smartling URL: https://dashboard.smartling.com/app/projects/[PROJECT_ID]
  defaultLocale: "en",
  smartlingLocaleToYextLocaleMapping: {
    // Mapping of Smartling locale code to Yext locale codes. Example:
    // "zh-CN": ["zh_Hans"],
  },
};
