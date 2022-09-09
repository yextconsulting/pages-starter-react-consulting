export default {
  // Global Parameters
  locales: ['en'],

  // Smartling Parameters
  userID: '',
  userSecret: '',
  projectID: '',
  defaultLocale: '', // Defaults to 'en'
  smartlingLocaleToYextLocaleMapping: {}, // ex. {"fr-FR": ["fr"]}

  // i18next-parser Parameters for 'scan' script
  createOldCatalogs: false,
  output: 'i18n/$LOCALE/$NAMESPACE.json',
}
