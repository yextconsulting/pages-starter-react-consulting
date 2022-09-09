import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';

const i18nOptions = {
  fallbackLng: 'en',
  lng: 'en',
  resources: {
    fr: {
      translation: {
        "hello world": "FR__Hello World",
        "Gallery Title": "FR__Gallery Title",
      },
    },
    en: {
      translation: {
        "Welcome to React": "Welcome to React and react-i18next",
        "hello world": "EN__Hello World",
        "Gallery Title": "EN__Gallery Title",
      }
    },
  },
  interpolation: {
    escapeValue: false
  },
  react: {
    useSuspense: false,
  },
  debug: true,
}

function i18nInstanceBuilder(locale: string, callback: Function): typeof i18n | undefined {
  i18n.use(initReactI18next).init(i18nOptions, () => callback());
  return i18n;
}

export {
  i18nInstanceBuilder,
  i18nOptions,
};
