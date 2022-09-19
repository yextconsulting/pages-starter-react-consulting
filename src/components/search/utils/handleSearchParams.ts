import { useEffect, useState } from "react";
import { Matcher } from "@yext/search-headless-react";
import type { DisplayableFacetOption, FieldValueStaticFilter, SearchHeadless, StaticFilter } from "@yext/search-headless-react";
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
      const facetParams = Array.from(searchParams.entries()).filter(([fieldId, options]) => fieldId !== 'q' && fieldId !== 'qp');

      // If the Mapbox place id is present then the static filter can be immediately set
      if (locationPlaceId) {
        searchActions.setStaticFilters([{
          displayName: locationDisplayName ?? '',
          selected: true,
          filter: {
            fieldId: 'builtin.location',
            kind: 'fieldValue',
            matcher: Matcher.Equals,
            value: locationPlaceId,
          }
        }]);
      }

      // If only the displayName is given, such as from a redirect from a client site, calculate the most likely
      // autocomplete option on the builtin.location filter. Then set the static filter from that option.
      else if (locationDisplayName) {
        // Get autocomplete options
        const filterSearchResponse = await searchActions.executeFilterSearch(
          locationDisplayName,
          false,
          [{ fieldApiName: "builtin.location", entityType: "location", fetchEntities: true }]
        );

        // Use first autocomplete result as static filter
        const topAutocompleteSuggestionFilter = filterSearchResponse?.sections[0].results[0];
        if (topAutocompleteSuggestionFilter?.filter?.value) {
          searchActions.setStaticFilters([{
            displayName: topAutocompleteSuggestionFilter?.value,
            selected: true,
            filter: {
              fieldId: 'builtin.location',
              kind: 'fieldValue',
              matcher: Matcher.Equals,
              value: topAutocompleteSuggestionFilter.filter.value,
            }
          }]);
        }
      }

      if (locationPlaceId || locationDisplayName) {
        // Add facets
        // See here for context on the unnecessary, but required parameters: https://yext.slack.com/archives/C032CKFARGS/p1662485143150619?thread_ts=1662479875.900099&cid=C032CKFARGS
        if (facetParams.length) {
          for (const [fieldId, options] of facetParams) {
            const optionsArray = options.split(',');
            if (optionsArray.length) {
              let optionsToAdd: DisplayableFacetOption[] = [];
              for (const option of optionsArray) {
                // Add facet option
                // Note that count and displayName are required parameters, but are not required for the api call.
                optionsToAdd.push({
                  count: 0,
                  displayName: '',
                  matcher: Matcher.Equals,
                  value: option,
                  selected: true,
                });
              }

              // Set facet with above options
              // Note that displayName is a required parameter, but is not required for the api call.
              searchActions.setFacets([{
                displayName: '',
                fieldId: fieldId,
                options: optionsToAdd
              }, ...(searchActions.state.filters.facets || [])]);
            }
          }
        }

        // Finally run vertical search with all the static and facet filters set from the URLSearchParams
        await searchActions.executeVerticalQuery();
      }
      if (callback) {
        callback();
      }
    }
    loadUrlParams();
  }, []);
}

// Function to ensure all the static filters are field value static filters
const getFieldValueFilters = (staticFilters: StaticFilter[]): FieldValueStaticFilter[] => {
  const newFilters = staticFilters.reduce((fieldValueFilters: FieldValueStaticFilter[], filter) => {
    if (filter.kind === "fieldValue") {
      fieldValueFilters.push(filter);
    }
    return fieldValueFilters;
  }, []);
  return newFilters;
};


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
      const allSelectedFilters = staticFilters.filter(f => f.selected);
      const locationFilter = getFieldValueFilters(allSelectedFilters.map(f => f.filter)).find(f => f.fieldId === 'builtin.location');
      const selectedFilter = allSelectedFilters.find(f => f.filter  === locationFilter);

      // Prevent setting URLParam from geolocation search for now
      if (selectedFilter && locationFilter && typeof(locationFilter.value) === "string") {
        let searchParamsObject: {[key: string]: string} = {};
        searchParamsObject["q"] = locationFilter.value
        if (selectedFilter.displayName) {
          searchParamsObject["qp"] = selectedFilter.displayName;
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

// Custom hook to unset the location filter set from URLSearchParams on user filter search
// Currently necessary since FilterSearch component doesn't have a way to set its initial state
export function useHandleInitialLocationFilter(
  searchActions: SearchHeadless,
  initialParamsLoaded: boolean
) {
  const [userSearchRun, setUserSearchRun] = useState(false);
  const [initialSearchValue, setInitialSearchValue] = useState("");
  useEffect(() => {
    const staticFilters = searchActions.state.filters.static;

    // Get value of initial filter to save for removing later
    if (staticFilters && !initialSearchValue) {
      const initialFilter = getFieldValueFilters(staticFilters.map(f => f.filter)).find(f => f.fieldId === 'builtin.location');
      if (initialFilter && typeof initialFilter.value === 'string') {
        setInitialSearchValue(initialFilter.value);
      }
    }

    // After the initial searches are made initialParamsLoaded will be true so this will trigger on the next search.
    // Unset initialFilter and rerun search so only one filter is active.
    // A new search needs to be run since there's currently no reliable way to update the filter state before the previos filter search is initiated.
    if (initialParamsLoaded && !userSearchRun) {
      const activeLocationFilter = staticFilters?.find(f => f.filter.kind === 'fieldValue' && f.filter.value === initialSearchValue);
      if (activeLocationFilter) {
        searchActions.setFilterOption({
          ...activeLocationFilter,
          selected: false,
        });
        searchActions.executeVerticalQuery();
      }
      setUserSearchRun(true);
    }
  }, [searchActions.state.filters.static]);
}
