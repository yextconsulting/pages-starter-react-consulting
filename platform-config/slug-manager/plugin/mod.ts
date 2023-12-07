import { createSlugManager } from "https://deno.land/x/yextpages@plugins@1.0.0-beta.6/mod.ts";

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
  // Uncomment if you want to scope the slug manager to a specific filter
  // The ids here must be the internal search ids, visible as the `selectedSavedFilterId`
  // query parameter when viewing the filter on the entity list page, NOT the filter
  // from the Saved Filters page.
  // searchIds: [],
});
