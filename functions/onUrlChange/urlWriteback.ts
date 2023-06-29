import { urlWritebackPlugin } from "https://deno.land/x/yextpages@plugins@1.0.0-beta.3/mod.ts";

const pageUrlCustomField = "c_pagesURL"; // Need to update to api name of CF storing prod URL for entities
const API_KEY = "<REPLACE-ME>";

export const main = urlWritebackPlugin({
  field: pageUrlCustomField,
  apiKey: API_KEY,
  environment: "prod",
  v: "20221010",
});
