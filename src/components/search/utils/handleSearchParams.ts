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

    // loadSearchParams(searchActions, searchParams, callback);
  }, [searchActions, searchParams, setSearchParams, paramsLoaded, callback]);
}

// Register listeners for updating the URLSearchParams when the search redux state is updated.
export function useHandleSearchParams(initialParamsLoaded: boolean) {
  const searchActions = useSearchActions();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    // Don't register listeners on page load until all of the initial params are loaded.
    if (!initialParamsLoaded) return;

    let encodedStatic;
    let encodedFacets;

    const filters = searchActions.state.filters;
    if (filters.static) {
      encodedStatic = encodeStaticFilters(filters.static);
    }

    if (filters.facets) {
      encodedFacets = encodeFacetFilters(filters.facets);
    }

    let combined = "";

    if (encodedStatic) {
      combined += encodedStatic.toString();
    }

    if (encodedFacets) {
      combined += `&${encodedFacets.toString()}`;
    }

    if (combined && combined !== searchParams.toString()) {
      setSearchParams(combined);
    }
  }, [searchActions.state.filters, initialParamsLoaded]);
}

export function useUpdateState() {
  const searchActions = useSearchActions();
  const [searchParams, _] = useSearchParams();
  const location = useLocation();

  useEffect(() => {
    /**
     * The search components update the state, which triggers a query params update, which then triggers this.
     * This results in the state being set again by the query parameters this time.
     * This function doesn't need to run in this case.
     */
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
        searchActions.resetFacets();
        await searchActions.executeVerticalQuery();
      }
    }

    let updateNeeded = false;
    const facets = searchParams.get("facets");

    const searchParamsWithoutFacets = new URLSearchParams(searchParams);
    searchParamsWithoutFacets.delete("facets");

    const encodedCurrentStatic =
      encodeStaticFilters(searchActions.state.filters.static || []) ??
      new URLSearchParams();
    if (
      encodedCurrentStatic?.toString() !== searchParamsWithoutFacets.toString()
    ) {
      console.log("Static need update");
      updateNeeded = true;
    }

    const encodedCurrentFacets =
      encodeFacetFilters(searchActions.state.filters.facets || []) ??
      new URLSearchParams();
    if (encodedCurrentFacets.get("facets") !== facets) {
      console.log("Facets need update");
      updateNeeded = true;
    }

    if (updateNeeded) {
      console.log("Reconcile required.");
      loadParams();
    }
  }, [location]);
}
