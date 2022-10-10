// TODO: Replace with projects experience values.

// Path for the search page.
export const SEARCH_PATH = "search";
// Static filter field for FilterSearch.
export const LOCATOR_STATIC_FILTER_FIELD = "builtin.location";
// Entity type for FilterSearch
export const LOCATOR_ENTITY_TYPE = "location";
// Radius used for the locator geolocate button.
export const GEOLOCATE_RADIUS = 50;

// Search configuration used to initialize provider in search.tsx
export const getSearchProviderConfig = (locale: string) => ({
	apiKey: "b7930d2fa7b5b106371224158c5854d2",
	experienceKey: "locator",
	locale: locale,
	verticalKey: "locations",
	experienceVersion: "STAGING",
});
