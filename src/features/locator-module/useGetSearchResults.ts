import { useEffect, useState } from "react";
import {
  Result,
  SearchCore,
  useSearchActions,
  useSearchState,
} from "@yext/search-headless-react";

async function fetchAll<T>(
  core: SearchCore,
  verticalKey: string,
  limit = Infinity
) {
  async function fetchPage(offset: number) {
    return core.verticalSearch({
      query: "",
      verticalKey,
      limit: Math.min(limit, 50),
      offset,
      retrieveFacets: false,
      skipSpellCheck: true,
    });
  }

  const res = await fetchPage(0);
  const searches = [Promise.resolve(res)];
  const per = 50;
  const totalEntities = Math.min(res.verticalResults.resultsCount, limit);

  for (
    let offset = res.verticalResults.results.length;
    offset < totalEntities;
    offset += per
  ) {
    searches.push(fetchPage(offset));
  }

  const out: Result<T>[] = [];
  await Promise.all(searches).then((responses) => {
    for (const response of responses) {
      out.push(...(response.verticalResults.results as Result<T>[]));
    }
  });

  return out;
}

export function useGetSearchResults<T>(
  displayAllOnNoResults?: boolean,
  allResultsOnLoad?: boolean,
  allResultsLoadedCallback?: () => void
) {
  const [allResults, setAllResults] = useState<Result<T>[]>([]);
  const actions = useSearchActions();
  const state = useSearchState((s) => s);
  const initialLoad = !state.query.queryId;

  useEffect(() => {
    if (!allResultsOnLoad || !state.vertical.verticalKey) return;

    async function load() {
      // @ts-expect-error core is private, but we want to reuse the same core
      const res = await fetchAll<T>(actions.core, state.vertical.verticalKey);
      setAllResults(res);
      allResultsLoadedCallback?.();
    }

    load();
  }, [
    actions,
    allResultsLoadedCallback,
    allResultsOnLoad,
    state.vertical.verticalKey,
  ]);

  const vertical = useSearchState((searchState) => searchState.vertical);
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
