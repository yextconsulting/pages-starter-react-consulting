import { isProduction } from "@yext/pages/util";
import { provideHeadless } from "@yext/search-headless-react";
import type { ConfigurationProviderContextType } from "@yext/sites-react-components";
// import { SandboxEndpoints } from "@yext/search-headless-react"; // Add if using a sandbox account

const config: ConfigurationProviderContextType = {
  components: {},
};

export default config;

// Key for Maps provider.
export const MAPS_API_KEY = "<REPLACE-ME>";

// Path for the search page.
// Exported here since it's required across multiple pages such as the nearby section and directory search bar.
export const FALLBACK_SEARCH_PATH = "search";
// Static filter field for FilterSearch.
export const LOCATOR_STATIC_FILTER_FIELD = "builtin.location";
// Entity type for FilterSearch
export const LOCATOR_ENTITY_TYPE = "location";
// Radius used for the locator geolocate button.
export const GEOLOCATE_RADIUS = 50;

export const getSearchProvider = (
  apiKey: string,
  locale: string,
  domain: string
) => {
  const experienceVersion = isProduction(domain) ? "PRODUCTION" : "STAGING";

  return provideHeadless({
    apiKey,
    experienceKey: "locator",
    locale,
    verticalKey: "locations",
    experienceVersion,
    // endpoints: SandboxEndpoints // Add if using a sandbox account
  });
};
