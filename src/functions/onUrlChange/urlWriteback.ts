import { urlWriteback } from "@yext/pages/plugins";

const pageUrlCustomField = "c_pagesURL"; // Need to update to api name of CF storing prod URL for entities
const API_KEY = "<REPLACE-ME>";

const main = urlWriteback({
  field: pageUrlCustomField,
  apiKey: API_KEY,
  environment: "prod",
  v: "20221010",
});

export default main;
