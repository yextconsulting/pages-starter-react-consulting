import { FieldValueStaticFilter } from "@yext/search-headless-react";

// Check if a static filter came from a search on the "builtin.location" search fieldId.
// FilterSearch can return several different filters depending on the type of search made (location, region, or country).
// The returned filterIds can be "builtin.locaiton", "builtin.region", or "address.countryCode".
// See here for more details: https://docs.google.com/document/d/1czipixNt3dIVPQ9Xe3leM_FJQgG03i2_8L76RILeNIk/edit#heading=h.nc11yk7bgxbg
export const checkIsLocationFilter = (filter: FieldValueStaticFilter) => {
  return (
    filter.fieldId === "builtin.location" ||
    filter.fieldId === "builtin.region" ||
    filter.fieldId === "address.countryCode"
  );
};
