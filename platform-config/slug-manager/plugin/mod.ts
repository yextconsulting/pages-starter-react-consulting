import { createSlugManager } from "https://deno.land/x/yextpages@pages@1.0.0-rc.5/mod.ts";

declare const API_KEY: string;

export const { webhook, connector } = createSlugManager({
  apiKey: API_KEY,
  slugFormat: (lang, profile) => {
    if (lang === "en") {
      return "[[address.region]]/[[address.city]]/[[address.line1]]";
    }
    return "[[localeCode]]/[[address.region]]/[[address.city]]/[[address.line1]]";
  },
  fields: [],
  entityTypes: ["location"],
});
