import { FieldValueStaticFilter } from "@yext/search-headless-react";

export const checkIsLocationFilter = (filter: FieldValueStaticFilter) => {
  return (
    filter.fieldId === "builtin.location" ||
    filter.fieldId === "builtin.region" ||
    filter.fieldId === "address.countryCode"
  );
};
