import {
  useSearchActions,
  useSearchState,
  type SearchHeadless,
  type State as SearchState,
} from "@yext/search-headless-react";
import {
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { BrowserRouter, useLocation, useSearchParams } from "react-router-dom";
import { createCtx } from "src/common/createCtx";
import {
  decodeFacetFilters,
  decodeStaticFilters,
  encodeFacetFilters,
  encodeStaticFilters,
} from "./utils/filterEncodings";
import { getRuntime } from "@yext/pages/util";

export const [useLocatorRouter, LocatorRouterProvider] = createCtx<{
  initialParamsLoaded: boolean;
}>("Attempted to call useLocatorRouter outside of LocatorRouterProvider");

interface LocatorRouterProps {
  router: Router;
  children?: ReactNode;
}

export default function LocatorRouter(props: LocatorRouterProps) {
  if (getRuntime()?.name !== "browser") {
    return null;
  }

  return (
    // TODO(jhood): use tanstack router or something else here for query param management?
    <BrowserRouter> 
      <LocatorRouterInternal router={props.router} children={props.children} />
    </BrowserRouter>
  );
}

const LocatorRouterInternal = ({
  router,
  children,
}: LocatorRouterProps) => {
  const state = useSearchState(state => state);
  const actions = useSearchActions();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [initialParamsLoaded, setInitialParamsLoaded] = useState(false);

  // Load initial state from search params.
  useEffect(() => {
    if (initialParamsLoaded) return;
    console.log("Loading initial params");

    async function loadInitialParams() {
      const staticFilter = await decodeStaticFilters(searchParams, actions);
      const facetFilters = decodeFacetFilters(searchParams);

      if (staticFilter) {
        actions.setState({
          ...state,
          filters: {
            static: [staticFilter],
            facets: facetFilters,
          }
        });

        try {
          await actions.executeVerticalQuery();
        } catch (error) {
          console.error(error);
        }
      }

      setInitialParamsLoaded(true);
    }
    loadInitialParams();
  }, []);

  // Sync state on search params update.
  useEffect(() => {
    if (!initialParamsLoaded) return;

    async function loadParams() {
      const staticFilter = await decodeStaticFilters(
        searchParams,
        actions
      );
      const facetFilters = decodeFacetFilters(searchParams);

      if (staticFilter) {
        actions.setState({
          ...state,
          filters: {
            static: [staticFilter],
            facets: facetFilters,
          }
        });

        try {
          await actions.executeVerticalQuery();
        } catch (error) {
          console.error(error);
        }
      } else {
        // Reset back to initial search state.
        actions.setState({
          ...actions.state,
          vertical: {
            ...actions.state.vertical,
            results: [],
          },
          filters: {},
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
      encodeStaticFilters(state.filters?.static || []) ?? new URLSearchParams();
    if (
      encodedCurrentStaticFilter?.toString() !==
      searchParamsWithoutFacets.toString()
    ) {
      updateNeeded = true;
    }

    // If the current facet filters in state don't match the decoded facet filters from the URLSearchParams perform an update.
    const encodedCurrentFacets =
      encodeFacetFilters(state.filters.facets || []) ?? new URLSearchParams();
    if (encodedCurrentFacets.get("facets") !== facets) {
      updateNeeded = true;
    }

    if (updateNeeded) {
      console.log("Syncing state");
      loadParams();
    }
  }, [location]);

  // Sync search params on state update.
  useEffect(() => {
    if (!initialParamsLoaded) return;

    const encodedStatic = encodeStaticFilters(state.filters?.static || []);
    const encodedFacets = encodeFacetFilters(state.filters?.facets || []);
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
      console.log("Syncing search params");
      setSearchParams(newSearchString);
    }
  }, [state]);

  return (
    <LocatorRouterProvider value={{ initialParamsLoaded }}>
      {children}
    </LocatorRouterProvider>
  );
}

interface Router {
  stateMapping: {
    stateToRoute: (state: SearchState) => URLSearchParams;
    routeToState: (searchParams: URLSearchParams, actions: SearchHeadless) => SearchState;
  }
}

export const defaultLocatorRouter: Router = {
  stateMapping: {
    stateToRoute(state) {
      const encodedStatic = encodeStaticFilters(state.filters?.static || []);
      const encodedFacets = encodeFacetFilters(state.filters?.facets || []);
      let newSearchString = "";

      if (encodedStatic) {
        newSearchString += encodedStatic.toString();

        // Add facets if static filter exists.
        if (encodedFacets) {
          newSearchString += `&${encodedFacets.toString()}`;
        }
      }

      return new URLSearchParams(newSearchString);
    },
    routeToState(searchParams, actions) {
      async function loadInitialParams() {
        const staticFilter = await decodeStaticFilters(searchParams, actions);
        const facetFilters = decodeFacetFilters(searchParams);
  
        if (staticFilter) {
          actions.setState({
            ...actions.state,
            filters: {
              static: [staticFilter],
              facets: facetFilters,
            }
          });
        }
      }
      loadInitialParams();

      return actions.state;
    },
  }
}
