import { useEffect } from "react";
import { useSearchActions, useSearchState } from "@yext/search-headless-react";
import { useLocation, useSearchParams } from "react-router-dom";
import {
  decodeFacetFilters,
  decodeStaticFilters,
  encodeFacetFilters,
  encodeStaticFilters,
} from "./filterEncodings";

export function useLoadInitialSearchParams(
  paramsLoaded: boolean,
  callback?: () => void
) {
  const [searchParams] = useSearchParams();
  const searchActions = useSearchActions();

  useEffect(() => {
    if (paramsLoaded) return;

    async function loadInitialParams() {
      const staticFilter = await decodeStaticFilters(
        searchParams,
        searchActions
      );
      const facetFilters = decodeFacetFilters(searchParams);

      if (staticFilter) {
        searchActions.setStaticFilters([staticFilter]);
        searchActions.setFacets(facetFilters);

        try {
          await searchActions.executeVerticalQuery();
        } catch (error) {
          console.error(error);
        }
      }

      callback?.();
    }

    loadInitialParams();
  }, [callback, paramsLoaded, searchActions, searchParams]);
}

export function useSyncSearchParamsWithState(initialParamsLoaded: boolean) {
  const [searchParams, setSearchParams] = useSearchParams();
  const filters = useSearchState((state) => state.filters);

  useEffect(() => {
    if (!initialParamsLoaded) return;

    const encodedStatic = encodeStaticFilters(filters?.static || []);
    const encodedFacets = encodeFacetFilters(filters?.facets || []);
    let newSearchString = "";

    if (encodedStatic) {
      newSearchString += encodedStatic.toString();

      if (encodedFacets) {
        newSearchString += `&${encodedFacets.toString()}`;
      }
    }

    if (newSearchString !== searchParams.toString()) {
      setSearchParams(newSearchString);
    }
  }, [filters, initialParamsLoaded, searchParams, setSearchParams]);
}

export function useSyncStateWithSearchParams() {
  const searchActions = useSearchActions();
  const [searchParams] = useSearchParams();
  const location = useLocation();

  useEffect(() => {
    async function loadParams() {
      const staticFilter = await decodeStaticFilters(
        searchParams,
        searchActions
      );
      const facetFilters = decodeFacetFilters(searchParams);

      if (staticFilter) {
        searchActions.setStaticFilters([staticFilter]);
        searchActions.setFacets(facetFilters);

        try {
          await searchActions.executeVerticalQuery();
        } catch (error) {
          console.error(error);
        }
      } else {
        searchActions.setStaticFilters([]);
        searchActions.setFacets([]);
        searchActions.setState({
          ...searchActions.state,
          vertical: {
            ...searchActions.state.vertical,
            results: undefined,
          },
          query: {},
        });
      }
    }

    let updateNeeded = false;
    const facets = searchParams.get("facets");
    const searchParamsWithoutFacets = new URLSearchParams(searchParams);
    searchParamsWithoutFacets.delete("facets");

    const encodedCurrentStaticFilter =
      encodeStaticFilters(searchActions.state.filters?.static || []) ??
      new URLSearchParams();
    if (
      encodedCurrentStaticFilter.toString() !==
      searchParamsWithoutFacets.toString()
    ) {
      updateNeeded = true;
    }

    const encodedCurrentFacets =
      encodeFacetFilters(searchActions.state.filters.facets || []) ??
      new URLSearchParams();
    if (encodedCurrentFacets.get("facets") !== facets) {
      updateNeeded = true;
    }

    if (updateNeeded) {
      loadParams();
    }
  }, [location, searchActions, searchParams]);
}
