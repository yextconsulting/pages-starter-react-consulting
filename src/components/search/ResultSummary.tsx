import { useSearchState } from "@yext/search-headless-react";
import "src/components/search/ResultSummary.css";

export default function ResultSummary() {
  // TODO: need to link to directory
  const ititialSummaryText = "Use our locator to find a location near you or browse our directory."
  // Check if search has been made and if not render the initial text
  const query = useSearchState(state => state.query?.queryId);
  const resultsCountText = useResultsCount();

  return (
    <div className="ResultSummary">
      { query ? resultsCountText : ititialSummaryText }
    </div>
  );
}

function useResultsCount() {
  const state = useSearchState(state => state);
  let searchPlace = "";
  let resultsCount = 0;

  // TODO: Like in searchbox this should pull from the same config/ stream definition if possible.
  if (state.filters.static?.length) {
    state.filters.static.forEach(filter => {
      if (filter.fieldId === "builtin.location" && filter.displayName) {
        searchPlace = filter.displayName;
      }
    })
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
