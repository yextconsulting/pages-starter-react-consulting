import i18n from "i18next";
import {
  useTranslation as usei18nextTranslation,
  initReactI18next,
} from "react-i18next";
import type { Resource } from "i18next";

export async function getTranslations(localeCode: string) {
  return await import(`../locales/${localeCode}/translation.json`)
    .then((module) => ({ [localeCode]: { translation: module.default } }))
    .catch(() => {
      console.error(`unable to load translations for: ${localeCode}`);
      return {};
    });
}

export function initi18n(resources: Resource, locale: string) {

  i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      resources,
      compatibilityJSON: "v3",
      returnEmptyString: false,
      interpolation: {
        escapeValue: false, // react already safes from xss
      },
    });
  i18n.changeLanguage(locale);
  return i18n;
}

export function useTranslation() {
  const { t, ...rest } = usei18nextTranslation();
  return {
    // @ts-expect-error typings for `t` are complicated
    t: (key, ...args) => {
      if (args.length > 0) {
        // @ts-expect-error see above
        return t(key, ...args);
      } else {
        return t(key, key);
      }
    },
    ...rest,
  };
}
