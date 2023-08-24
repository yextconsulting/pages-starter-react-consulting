import { useState, useEffect } from "react";
import {
  Result,
  SearchCore,
  useSearchState,
  useSearchActions,
} from "@yext/search-headless-react";

async function fetchAll<T>(core: SearchCore, verticalKey: string) {
  async function fetchPage(offset: number) {
    const res = await core.verticalSearch({
      query: "",
      verticalKey: verticalKey,
      limit: 50,
      offset,
      retrieveFacets: false,
      skipSpellCheck: true,
    });
    return res;
  }

  let offset = 0;
  let done = false;
  const out = [];

  while (!done) {
    const res = await fetchPage(offset);
    out.push(...(res.verticalResults.results as Result<T>[]));
    if (out.length === res.verticalResults.resultsCount) {
      done = true;
    }
    offset += 50;
  }

  return out;
}

// Get the results from the search state and cast to the given type.
export function useGetSearchResults<T>(
  displayAllOnNoResults?: boolean,
  allResultsOnLoad?: boolean,
  allResultsLoadedCallback?: () => void
) {
  const [allResults, setAllResults] = useState<Result<T>[]>([]);
  const [allResultsLoaded, setAllResultsLoaded] = useState(false);
  const actions = useSearchActions();
  const state = useSearchState((s) => s);
  const initialLoad = !state.query.queryId;

  useEffect(() => {
    if (!allResultsOnLoad || allResultsLoaded || !state.vertical.verticalKey)
      return;
    async function load() {
      // @ts-expect-error core is private, but we want to reuse the same core as the
      // locator, rather than needing to create a new instance with the same configuration
      // it's less convenient to use it indirectly through searchActions.executeVerticalQuery
      // because that doesn't provide us direct access to results
      const res = await fetchAll<T>(actions.core, state.vertical.verticalKey);
      setAllResultsLoaded(true);
      setAllResults(res);
      if (allResultsLoadedCallback) allResultsLoadedCallback();
    }
    load();
  }, []);

  const vertical = useSearchState((state) => state.vertical);
  const verticalResults = vertical.results;
  const allResultsForVertical =
    vertical?.noResults?.allResultsForVertical.results;

  if (initialLoad && allResultsOnLoad) return allResults;

  const results = verticalResults?.length
    ? verticalResults
    : displayAllOnNoResults
    ? allResultsForVertical
    : [];

  return results as Result<T>[];
}
