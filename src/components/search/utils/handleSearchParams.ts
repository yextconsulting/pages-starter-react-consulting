import { useEffect } from "react";
import { Matcher } from "@yext/search-headless-react";
import type { DisplayableFacetOption, FieldValueStaticFilter, SearchHeadless, StaticFilter } from "@yext/search-headless-react";
import { getUserLocation } from "@yext/search-ui-react";
import { GEOLOCATE_RADIUS, LOCATOR_STATIC_FILTER_FIELD, LOCATOR_ENTITY_TYPE } from "src/config";

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

export function useLoadInitialSearchParams(
  searchActions: SearchHeadless,
  searchParams: URLSearchParams,
  callback?: () => void,
) {
  useEffect(() => {
    const loadUrlParams = async () => {
      // TODO: create filters_config to do this easier
      const locationPlaceId = searchParams.get('q');
      const locationDisplayName = searchParams.get('qp');
      const filterType = searchParams.get('filter_type');
      const facetParams = Array.from(searchParams.entries()).filter(([fieldId, _]) => !['q', 'qp', 'filter_type'].includes(fieldId));

      // If the Mapbox place id is present then the static filter can be immediately set
      if (locationPlaceId) {
        // If using Near filter from GeolocateButton
        if (locationDisplayName === 'My Location') {
          searchActions.setStaticFilters([{
            displayName: locationDisplayName,
            selected: true,
            filter: {
              fieldId: LOCATOR_STATIC_FILTER_FIELD,
              kind: 'fieldValue',
              matcher: Matcher.Near,
              value: JSON.parse(locationPlaceId),
            }
          }]);
        } else {
          // TODO: this can be a function since it's inverse is used in SearchBox.tsx
          const filterField =
            filterType === "location" ? "builtin.location" :
            filterType === "region" ? "builtin.region" :
            "address.countryCode";

          searchActions.setStaticFilters([{
            displayName: locationDisplayName ?? '',
            selected: true,
            filter: {
              fieldId: filterField,
              kind: 'fieldValue',
              matcher: Matcher.Equals,
              value: locationPlaceId,
            }
          }]);
        }
      }

      // If only 'My Location' is passed in then run a geolocation search
      else if (locationDisplayName === 'My Location') {
        try {
          const position = await getUserLocation();

          // Set userlocation bias
          searchActions.setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });

          searchActions.setStaticFilters([{
            displayName: locationDisplayName,
            selected: true,
            filter: {
              fieldId: LOCATOR_STATIC_FILTER_FIELD,
              kind: 'fieldValue',
              matcher: Matcher.Near,
              value: { lat: position.coords.latitude, lng: position.coords.longitude, radius: 1609 * GEOLOCATE_RADIUS },
            }
          }]);
        } catch (e) {
          alert("User location could not be determined.");
          console.error(e);
        }
      }

      // If only the displayName is given, such as from a redirect from a client site, calculate the most likely
      // autocomplete option on the builtin.location filter. Then set the static filter from that option.
      else if (locationDisplayName) {
        // Get autocomplete options
        const filterSearchResponse = await searchActions.executeFilterSearch(
          locationDisplayName,
          false,
          [{ fieldApiName: LOCATOR_STATIC_FILTER_FIELD, entityType: LOCATOR_ENTITY_TYPE, fetchEntities: true }]
        );

        // Use first autocomplete result as static filter
        const topAutocompleteSuggestionFilter = filterSearchResponse?.sections[0].results[0];
        if (topAutocompleteSuggestionFilter?.filter?.value) {
          searchActions.setStaticFilters([{
            displayName: topAutocompleteSuggestionFilter?.value,
            selected: true,
            filter: {
              fieldId: LOCATOR_STATIC_FILTER_FIELD,
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
        if (searchActions.state.filters.static) {
          try {
            await searchActions.executeVerticalQuery();
          } catch(error) {
            console.error(error);
          }
        }
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
