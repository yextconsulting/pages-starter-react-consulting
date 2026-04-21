import type { State } from "@yext/search-headless-react";
import { useSearchState } from "@yext/search-headless-react";
import { useMemo } from "react";
import { LOCATOR_STATIC_FILTER_FIELD } from "src/config";
import { useLocator } from "./useLocator";
import { checkIsLocationFilter } from "./checkIsLocationFilter";

const ResultSummary = () => {
  const searchState = useSearchState((state) => state);
  const { results } = useLocator();
  const resultsText = useMemo(
    () => getResultsCountText(searchState, results.length),
    [results.length, searchState]
  );

  const initialSummaryText = (
    <span>Use our locator to find a location near you.</span>
  );

  return (
    <div className="mr-4">
      {searchState.query.queryId ? resultsText : initialSummaryText}
    </div>
  );
};

function getResultsCountText(state: State, resultsCount: number) {
  let searchPlace = "";

  if (state.filters.static?.length) {
    const activeFilter =
      state.filters.static.find(
        (filter) =>
          filter.selected &&
          filter.filter.kind === "fieldValue" &&
          (LOCATOR_STATIC_FILTER_FIELD === "builtin.location"
            ? checkIsLocationFilter(filter.filter)
            : LOCATOR_STATIC_FILTER_FIELD === filter.filter.fieldId) &&
          filter.displayName
      ) ?? null;

    if (activeFilter?.displayName) {
      searchPlace = activeFilter.displayName;
    }
  }

  if (searchPlace) {
    if (resultsCount === 0) {
      return `No locations found near "${searchPlace}".`;
    }
    if (resultsCount === 1) {
      return `${resultsCount} location near "${searchPlace}".`;
    }
    return `${resultsCount} locations near "${searchPlace}".`;
  }

  if (resultsCount === 0) {
    return "No locations found.";
  }
  if (resultsCount === 1) {
    return `${resultsCount} location found.`;
  }
  return `${resultsCount} locations found.`;
}

export default ResultSummary;
