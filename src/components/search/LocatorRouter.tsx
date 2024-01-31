import {
  useSearchActions,
  useSearchState,
  type SearchHeadless,
  type State,
} from "@yext/search-headless-react";
import {
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { BrowserRouter, useLocation, useSearchParams } from "react-router-dom";
import { createCtx } from "src/common/createCtx";
import { getRuntime } from "@yext/pages/util";

export const [useLocatorRouter, LocatorRouterProvider] = createCtx<{
  initialParamsLoaded: boolean;
}>("Attempted to call useLocatorRouter outside of LocatorRouterProvider");

export interface Router {
  // Encode search state into search params.
  stateToRoute: (state: State) => URLSearchParams;
  // Decode search params into search state.
  routeToState: (searchParams: URLSearchParams, actions: SearchHeadless) => Promise<State>
}

interface LocatorRouterProps {
  router: Router;
  children?: ReactNode;
}

/**
 * TODO(jhood):
 * 
 * Location and region searches now both return fieldId: "builtin.location"
 * with a radius and lat, lng included. builtin.region can be removed.
 * 
 * Might want to rethink what query params are required now that address.countryCode
 * if the only thing that returns a q param.
 * 
 * Do we need the location_type param?
 * 
 * Test with a different search_field like searching by name instead
 */

export default function LocatorRouter(props: LocatorRouterProps) {
  if (getRuntime()?.name !== "browser") {
    return null;
  }

  return (
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
  /**
   * On page load decode the search params into state. If a static filter is set, then run a vertical search.
   */
  useEffect(() => {
    if (initialParamsLoaded) return;
    console.log("Loading initial params");

    async function loadInitialParams() {
      const initialState = await router.routeToState(searchParams, actions);
      actions.setState(initialState);

      // TODO: check for something else here?
      if (initialState.filters.static?.find(f => f.selected)) {
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
  // When users click the forward or back browser buttons resync the state.
  // Don't run this when the search params change in reponse to user interaction (like making a filter searcg)
  // or applying facets.
  // Rest the state back to its default value when there are no query params.
  useEffect(() => {
    if (!initialParamsLoaded) return;

    async function loadParams() {
      const decodedState = await router.routeToState(searchParams, actions);

      // TODO(jhood): should this maybe be based off of something else?
      if (decodedState.filters.static?.find(f => f.selected)) {
        actions.setState(decodedState);
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

    const encodedSearchParams = router.stateToRoute(state);

    // Check if current state matches the current URLSearchParams when the state is encoded. If not, update the state.
    if (!compareSearchParams(encodedSearchParams, searchParams)) {
      console.log("Syncing state");
      loadParams();
    }
  }, [location]);

  // Sync search params on state update.
  /**
   * When the search state is updated in response to user interaction,
   * sync the search params.
   */
  useEffect(() => {
    if (!initialParamsLoaded || state.searchStatus.isLoading) return;

    const encodedSearchParams = router.stateToRoute(state);

    // Avoid pushing an identical URLSearchParams string.
    if (!compareSearchParams(encodedSearchParams, searchParams)) {
      console.log("Syncing search params");
      setSearchParams(encodedSearchParams);
    }
  }, [state]);

  return (
    <LocatorRouterProvider value={{ initialParamsLoaded }}>
      {children}
    </LocatorRouterProvider>
  );
}

// Check if two URLSearchParams objects have the same key-value pairs.
function compareSearchParams(params1: URLSearchParams, params2: URLSearchParams): boolean {
  const entries1 = Array.from(params1.entries());
  const entries2 = Array.from(params2.entries());

  // Check if the number of key-value pairs is the same
  if (entries1.length !== entries2.length) {
    return false;
  }

  // Check if all key-value pairs are equal
  for (const [key, value] of entries1) {
    // Check if the key is present in the second URLSearchParams
    if (!params2.has(key)) {
      return false;
    }

    // Check if the values for the key are equal
    if (params2.get(key) !== value) {
      return false;
    }
  }

  // If all checks pass, the URLSearchParams objects are equal
  return true;
}
