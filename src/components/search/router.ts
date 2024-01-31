import {
  decodeFacetFilters,
  decodeStaticFilters,
  encodeFacetFilters,
  encodeStaticFilters
} from "./utils/filterEncodings";
import type { Router } from "./LocatorRouter";

export const defaultLocatorRouter: Router = {
  stateToRoute(state) {
    // Use zod to parse params - add definition at top to make it easy
    // TODO(jhood): Update how this actually looks.
    const newParams: Record<string, string> = {
      q: "",  // Maps to value for Matcher.Equals. Only used for country searches.
      qp: "New+York+City%2C+New+York%2C+United+States", // Maps to displayName.
      lat: "40.7127492", // Maps to value for Matcher.Near.
      lng: "-74.0059945",
      r: "25",
      fieldId: "" // Infer builtin.location if not set.
    };

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
  // This doesn't mutate any data.
  // TODO(jhood): update the decode functions to make sure.
  // TODO(jhood): update to be by param key.

  // TODO(jhood): I'd like if this wasn't async.
  // how to handle async and non-async?
  async routeToState(searchParams, actions) {
    const staticFilter = await decodeStaticFilters(searchParams, actions);
    const facetFilters = decodeFacetFilters(searchParams);

    return {
      ...actions.state,
      filters: {
        static: staticFilter ? [staticFilter] : undefined,
        facets: facetFilters,
      }
    }
  },
}
