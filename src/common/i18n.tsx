import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const i18nDefaultOptions = {
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  },
  react: {
    useSuspense: false,
  },
  debug: true,
  saveMissing: true,
}

async function i18nInstanceBuilder(locale: string): Promise<typeof i18n | undefined> {
  const json = await import(`../../i18n/${locale}/translation.json`);
  const { default: translation } = json;

  const i18nOptions = {
    ...i18nDefaultOptions,
    lng: locale,
    resources: {
      [locale]: {
        translation,
      }
    }
  }

  return new Promise((resolve, reject) => {
    i18n.use(initReactI18next).init(i18nOptions, (err, t) => {
      if (err) return console.error(err);
      resolve(i18n);
    });
  });
}

export {
  i18nInstanceBuilder,
};
