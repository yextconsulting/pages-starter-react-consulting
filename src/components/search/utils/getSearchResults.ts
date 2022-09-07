import { useSearchState } from "@yext/search-headless-react";
import type { Coordinate } from "@yext/types";

type LocatorSearchResultType = {
  coordinate: Coordinate,
  id: string,
}

// Get search results from searchState and map to required fields for the Map and Marker components
// If displayAllOnNoResults = true, the search will use the 20 locations closest to the users location by default
export function getSearchResults(displayAllOnNoResults: boolean) {
  const results = useSearchState((state) => {
    const searchResults = state.vertical.results || [];
    const allResults= useSearchState(state => state.vertical?.noResults?.allResultsForVertical.results) || [];
    const resultsToMap = (searchResults.length === 0 && displayAllOnNoResults) ? allResults : searchResults;
    const dataToRender = resultsToMap.map((result) => {
      return {
        coordinate: result.rawData.yextDisplayCoordinate,
        id: result.id,
      } as LocatorSearchResultType;
    });
    return dataToRender;
  });

  return results;
}
