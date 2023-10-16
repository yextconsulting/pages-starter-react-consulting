import { createSlugManager } from "https://deno.land/x/yextpages@plugins@1.0.0-beta.5/mod.ts";

declare const API_KEY: string;

export const { webhook, connector } = createSlugManager({
  apiKey: API_KEY,
  slugFormat:
    "[[localeCode]]/[[address.region]]/[[address.city]]/[[address.line1]]",
  slugFormatLocaleOverrides: {
    en: "[[address.region]]/[[address.city]]/[[address.line1]]",
  },
  entityTypes: ["location"],
  env: "sandbox",
});
