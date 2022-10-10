import { urlWritebackPlugin } from "https://deno.land/x/yextpages@plugins@1.0.0-beta.3/mod.ts";

const pageUrlCustomField = "c_pagesUrl"; // Need to update to api name of CF storing prod URL for entities
const API_KEY = "cd3f805e30935f54064871ef060efae4";

export default urlWritebackPlugin({
  field: pageUrlCustomField,
  apiKey: API_KEY,
  environment: "prod",
  v: "20221010"
});