import { useEffect } from "react";
import { Matcher } from "@yext/search-headless-react";
import type { SearchHeadless } from "@yext/search-headless-react";
import type { URLSearchParamsInit } from "react-router-dom";

/**
 * TODO: FilterSearch doesn't account for builtin.location being set already so when there is a saved locationId in the URLSearchParams
 * two separate builtin.location filters are selected on the next FilterSearch and are combined to show results from both locations.
 * Looks like decorated actions are in the works, which can be used passed to the filtersearch component
 * to unselect any current "builtin.locations" filters that are selected.
 * Also the potential to set an initialFilterState would be useful here as well since otherwise the FilterSearch input won't be
 * populated.
 *
 * https://yext.slack.com/archives/C032CKFARGS/p1656075200100409
 */

export function loadInitialSearchParams(
  searchActions: SearchHeadless,
  searchParams: URLSearchParams,
  callback?: () => void,
) {
  useEffect(() => {
    const loadUrlParams = async () => {
      const locationPlaceId = searchParams.get('q');
      const locationDisplayName = searchParams.get('qp');
      if (locationPlaceId) {
        searchActions.setStaticFilters([{
          displayName: locationDisplayName ?? '',
          value: locationPlaceId,
          matcher: Matcher.Equals,
          fieldId: 'builtin.location',
          selected: true,
        }]);
        // Run vertical search with just builtin.location to load available facets in state.filters.facets
        await searchActions.executeVerticalQuery();

        const facetParams = Array.from(searchParams.entries()).filter(([fieldId, options]) => fieldId !== 'q' && fieldId !== 'qp');
        if (facetParams.length) {
          for (const [fieldId, options] of facetParams) {
            // Check if facet from params is available to set in the search state
            if (searchActions.state.filters.facets?.find(f => f.fieldId === fieldId)) {
              const optionsArray = options.split(',');
              optionsArray.forEach(option => {
                searchActions.setFacetOption(fieldId, { matcher: Matcher.Equals, value: option }, true);
              });
            }
          }
         await searchActions.executeVerticalQuery();
        }
      }
      if (callback) {
        callback();
      }
    }
    loadUrlParams();
  }, []);
}

/**
 * TODO: Update to use decorated actions and the filtersearch geolocate features are added by product.
 * TODO: This also doesn't work with geolocation at the moment since that uses {lat, long} instead of a Mapbox place id as the filter value
 */

export function updateSearchParams(
  searchActions: SearchHeadless,
  setSearchParams: (nextInit: URLSearchParamsInit, navigateOptions?: {
    replace?: boolean | undefined;
    state?: any;
  } | undefined) => void,
  initialParamsLoaded: boolean,
) {
  useEffect(() => {
    if (!initialParamsLoaded) return;

    const staticFilters = searchActions.state.filters.static;
    const facetFilters = searchActions.state.filters.facets;

    if (staticFilters) {
      // TODO: There are multiple filters that are valid here for the above reasons. Make sure this looks good after adding geolocate and decorated actions.
      const locationFilter = staticFilters.filter(f => f.selected).find(f => f.fieldId === 'builtin.location') ?? null;

      // Prevent setting URLParam from geolocation search for now
      if (locationFilter?.value && typeof(locationFilter.value) === "string") {
        let searchParamsObject: {[key: string]: string} = {};
        searchParamsObject["q"] = locationFilter.value
        if (locationFilter.displayName) {
          searchParamsObject["qp"] = locationFilter.displayName;
        }

        if (facetFilters) {
          const activeFacets = facetFilters.filter(facet => facet.options.filter(f => f.selected).length);
          activeFacets.forEach(facet => {
            const fieldId = facet.fieldId;
            const activeOptions = facet.options.filter(f => f.selected).map(f => f.value).join(',');
            searchParamsObject[fieldId] = activeOptions;
          });
        }

        setSearchParams(searchParamsObject);
      }
    }
  }, [searchActions.state.query.queryId]);
}
