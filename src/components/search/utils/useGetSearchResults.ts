import { Result, useSearchState } from "@yext/search-headless-react";

// Get the results from the search state and cast to the given type.
export function useGetSearchResults<T>(displayAllOnNoResults?: boolean) {
  const vertical = useSearchState((state) => state.vertical);
  const verticalResults = vertical.results;
  const allResultsForVertical =
    vertical?.noResults?.allResultsForVertical.results;

  const results = verticalResults?.length
    ? verticalResults
    : displayAllOnNoResults
    ? allResultsForVertical
    : [];

  return results as Result<T>[];
}
