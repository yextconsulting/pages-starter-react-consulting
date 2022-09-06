import { useSearchState } from "@yext/search-headless-react";
import { useEffect, useState } from "react";
import type { State } from "@yext/search-headless-react";
import "src/components/search/ResultSummary.css";

export default function ResultSummary() {
  const searchState = useSearchState(state => state);

  // TODO: need to link to directory
  const ititialSummaryText = "Use our locator to find a location near you or browse our directory."
  // Check if search has been made and if not render the initial text
  const [initialSearchMade, setInitialSearchMade] = useState(false);
  const [newSearchMade, setNewSearchMade] = useState(false);
  const [resultsCountText, setResultCountText] = useState<string | JSX.Element>("");

  // Wait for state loading to finish and the vertical results to exist
  useEffect(() => {
    if (!searchState.searchStatus.isLoading && searchState.vertical.results) {
      if (!initialSearchMade) {
        setInitialSearchMade(true);
      }
      setNewSearchMade(true);
    }
  }, [searchState.searchStatus.isLoading, searchState.vertical.results]);

  // Only update the resultsCountText after a search is made
  useEffect(() => {
    if (newSearchMade) {
      setNewSearchMade(false);
      setResultCountText(useResultsCount(searchState));
    }
  }, [newSearchMade, searchState.query.queryId]);

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
    const activeFilter = state.filters.static.filter(filter => filter.selected && filter.fieldId === "builtin.location" && filter.displayName);
    if (activeFilter.length && activeFilter[0].displayName) {
      searchPlace = activeFilter[0].displayName;
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
