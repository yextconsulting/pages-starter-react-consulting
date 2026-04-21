export function locationFilterToType(filterId: string) {
  return filterId === "builtin.location"
    ? "location"
    : filterId === "builtin.region"
    ? "region"
    : "country";
}

export function locationTypeToFilter(type: string) {
  return type === "location"
    ? "builtin.location"
    : type === "region"
    ? "builtin.region"
    : "address.countryCode";
}
