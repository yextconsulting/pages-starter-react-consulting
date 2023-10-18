// Convert a static filter fieldId to a URL param to distinguish location filter types.
export function locationFilterToType(filterId: string) {
  return filterId === "builtin.location"
    ? "location"
    : filterId === "builtin.region"
    ? "region"
    : "country";
}

// Convert a location filter type param to the actual location filter fieldId.
export function locationTypeToFilter(type: string) {
  return type === "location"
    ? "builtin.location"
    : type === "region"
    ? "builtin.region"
    : "address.countryCode";
}

export function combineSearchParams(
  params1: URLSearchParams,
  params2: URLSearchParams
) {
  const combinedParams = new URLSearchParams();
  for (const [key, val] of params1.entries()) {
    combinedParams.set(key, val);
  }
  for (const [key, val] of params2.entries()) {
    combinedParams.set(key, val);
  }
  return combinedParams;
}
