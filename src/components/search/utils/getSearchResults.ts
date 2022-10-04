import { useSearchState } from "@yext/search-headless-react";
import type { Coordinate } from "@yext/types";

type LocatorSearchResultType = {
  coordinate: Coordinate,
  id: string,
}

// Custom hook to get search results from search state and map them to the required fields for the Map and Marker components
// If displayAllOnNoResults = true, the search will use the 20 locations closest to the users location by default
export function useGetSearchResults(displayAllOnNoResults: boolean) {
  const state = useSearchState(state => state);
  const searchResults = state.vertical.results || [];
  const allResults = state.vertical.noResults?.allResultsForVertical.results || [];
  const resultsToMap = (!searchResults.length && displayAllOnNoResults) ? allResults : searchResults;
  const dataToRender = resultsToMap.map((result) => {
    return {
      coordinate: result.rawData.yextDisplayCoordinate,
      id: result.id,
    } as LocatorSearchResultType;
  });

  console.log(dataToRender);
  console.log(state);

  return dataToRender;
}
