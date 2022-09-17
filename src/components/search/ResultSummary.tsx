import { FieldValueStaticFilter, StaticFilter, useSearchState } from "@yext/search-headless-react";
import { useEffect, useState } from "react";
import type { State } from "@yext/search-headless-react";
import "src/components/search/ResultSummary.css";

export default function ResultSummary() {
  const searchState = useSearchState(state => state);

  // TODO: need to link to directory
  const ititialSummaryText = "Use our locator to find a location near you or browse our directory."
  // Check if search has been made and if not render the initial text
  const [initialSearchMade, setInitialSearchMade] = useState(false);
  const [resultsCountText, setResultCountText] = useState<string | JSX.Element>("");

  // Only update the resultsCountText after a search is made
  useEffect(() => {
    if (!searchState.searchStatus.isLoading && searchState.vertical.results) {
      if (!initialSearchMade) {
        setInitialSearchMade(true);
      }
      setResultCountText(useResultsCount(searchState));
    }
  }, [searchState.searchStatus.isLoading, searchState.vertical.results]);

  return (
    <div className="ResultSummary">
      { initialSearchMade ? resultsCountText : ititialSummaryText }
    </div>
  );
}

function useResultsCount(state: State) {
  let searchPlace = "";
  let resultsCount = 0;

  // TODO: Like in searchbox this should pull from the same config/ stream definition if possible.
  // TODO: make sure this works as expected when the new Geolocate component is added
  if (state.filters.static?.length) {
    const activeFilter = state.filters.static.find(f => f.selected && f.filter.kind === 'fieldValue' && f.filter.fieldId === "builtin.location" && f.displayName) ?? null;  
    if (activeFilter && activeFilter.displayName) {
      searchPlace = activeFilter.displayName;
    }
  }

  if (state.vertical) {
    resultsCount = state.vertical.results?.length ?? 0;
  }

  if (searchPlace) {
    const query = <span className="ResultSummary-query">{searchPlace}</span>
    if (resultsCount === 0) {
      return (
        <>No results found for "{query}"</>
      );
    }
    if (resultsCount === 1) {
      return (
        <>{resultsCount} location near "{query}"</>
      );
    }
    return (
      <>{resultsCount} locations near "{query}"</>
    );
  }

  if (resultsCount === 0) {
    return `No results found`;
  }
  if (resultsCount === 1) {
    return `${resultsCount} location`
  }
  return `${resultsCount} locations`;
}
