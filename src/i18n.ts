import i18n from "i18next";
import { getRuntime } from "@yext/pages/util";
import {
  useTranslation as usei18nextTranslation,
  initReactI18next,
} from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import type { TemplateRenderProps } from "src/types/entities";
import type { Resource } from "i18next";

declare global {
  interface Window {
    __INITIAL__DATA__: TemplateRenderProps;
  }
}

const detector = {
  name: "pagesJSDetector",

  lookup() {
    if (getRuntime().name === "browser") {
      return window.__INITIAL__DATA__.document.locale as string;
    }
  },

  cacheUserLanguage() {
    // Intentionally unimplemented
  },
};

export async function getTranslations(localeCode: string) {
  return await import(`../locales/${localeCode}/translation.json`)
    .then((module) => ({ [localeCode]: { translation: module.default } }))
    .catch(() => {
      console.error(`unable to load translations for: ${localeCode}`);
      return {};
    });
}

const dev = import.meta.env.DEV;

export function initi18n(resources: Resource, locale: string) {
  const languageDetector = new LanguageDetector();
  languageDetector.addDetector(detector);

  const lookupOrder = dev ? ["querystring"] : ["pagesJSDetector"];

  i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .use(languageDetector)
    .init({
      resources,
      compatibilityJSON: "v3",
      returnEmptyString: false,
      detection: {
        order: lookupOrder,
        lookupQuerystring: "locale",
      },
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
    t: (key, ...args) => {
      if (args.length > 0) {
        return t(key, ...args);
      } else {
        return t(key, key);
      }
    },
    ...rest,
  };
}
