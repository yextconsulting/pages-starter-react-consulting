import { urlWritebackPlugin } from "https://deno.land/x/yextpages@plugins@1.0.0-beta.3/mod.ts";

declare const API_KEY: string;

const pageUrlCustomField = "c_pagesUrl"; // Need to update to api name of CF storing prod URL for entities

export default urlWritebackPlugin({
  field: pageUrlCustomField,
  apiKey: API_KEY,
  environment: "prod",
  v: "20221010"
});