import { useEffect } from "react";
import { useSearchActions } from "@yext/search-headless-react";
import { useLocation, useSearchParams } from "react-router-dom";
import {
  decodeFacetFilters,
  decodeStaticFilters,
  encodeFacetFilters,
  encodeStaticFilters,
} from "./filterEncodings";

// Decode the URLSearchParams into search state on page load.
export function useLoadInitialSearchParams(
  paramsLoaded: boolean,
  callback?: () => void
) {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchActions = useSearchActions();

  useEffect(() => {
    // Don't run again after params are loaded.
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

      // If a callback prop is passed, invoke it now.
      // Useful for indicating that all the url params have been loaded.
      if (callback) {
        callback();
      }
    }
    loadInitialParams();
  }, [searchActions, searchParams, setSearchParams, paramsLoaded, callback]);
}

// On change in search state, encode the state into URLSearchParams and push to window.history if there is a delta.
export function useSyncSearchParamsWithState(initialParamsLoaded: boolean) {
  const searchActions = useSearchActions();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    // Don't register listeners on page load until all of the initial params are loaded.
    if (!initialParamsLoaded) return;

    const encodedStatic = encodeStaticFilters(
      searchActions.state.filters?.static || []
    );
    const encodedFacets = encodeFacetFilters(
      searchActions.state.filters?.facets || []
    );
    let newSearchString = "";

    if (encodedStatic) {
      newSearchString += encodedStatic.toString();

      // Add facets if static filter exists.
      if (encodedFacets) {
        newSearchString += `&${encodedFacets.toString()}`;
      }
    }

    // Avoid pushing an identical URLSearchParams string.
    if (newSearchString !== searchParams.toString()) {
      setSearchParams(newSearchString);
    }
  }, [searchActions.state.filters, initialParamsLoaded]);
}

// On change in window location, check if the decoded URLSearchParams match the current search state and update if there is a delta.
export function useSyncStateWithSearchParams() {
  const searchActions = useSearchActions();
  const [searchParams, _] = useSearchParams();
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
        // Reset back to initial search state.
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

    // If the current static filter in state doesn't match the decoded static filter from the URLSearchParams perform an update.
    const encodedCurrentStaticFilter =
      encodeStaticFilters(searchActions.state.filters?.static || []) ??
      new URLSearchParams();
    if (
      encodedCurrentStaticFilter?.toString() !==
      searchParamsWithoutFacets.toString()
    ) {
      updateNeeded = true;
    }

    // If the current facet filters in state don't match the decoded facet filters from the URLSearchParams perform an update.
    const encodedCurrentFacets =
      encodeFacetFilters(searchActions.state.filters.facets || []) ??
      new URLSearchParams();
    if (encodedCurrentFacets.get("facets") !== facets) {
      updateNeeded = true;
    }

    if (updateNeeded) {
      loadParams();
    }
  }, [location]);
}
