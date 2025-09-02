import { isProduction } from "@yext/pages/util";
import { provideHeadless } from "@yext/search-headless-react";
// import { SandboxEndpoints } from "@yext/search-headless-react"; // Add if using a sandbox account

declare global {
  const YEXT_PUBLIC_MAPS_API_KEY: string;
  const YEXT_PUBLIC_SEARCH_EXPERIENCE_API_KEY: string;
  const YEXT_PUBLIC_NEARBY_SECTION_API_KEY: string;
  const YEXT_PUBLIC_REVIEWS_API_KEY: string;
  const YEXT_PUBLIC_ANALYTICS_API_KEY: string;
}

// Key for Maps provider.
export const MAPS_API_KEY = YEXT_PUBLIC_MAPS_API_KEY || "<REPLACE-ME>";

// Yext404Pixel Endpoints
export const YEXT_404_PIXEL_PROD =
  "https://0kug74ckj8.execute-api.us-east-1.amazonaws.com/prod/v1/404.gif";
export const YEXT_404_PIXEL_STAGING =
  "https://ve5o9iwzrl.execute-api.us-east-1.amazonaws.com/dev/v1/404.gif";

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
