import { useEffect } from "react";
import { Matcher } from "@yext/search-headless-react";
import type { DisplayableFacetOption, SearchHeadless } from "@yext/search-headless-react";
import { getUserLocation } from "@yext/search-ui-react";
import { GEOLOCATE_RADIUS, LOCATOR_STATIC_FILTER_FIELD, LOCATOR_ENTITY_TYPE } from "src/config";
import type { SetSearchParamsType } from "src/types/additional";

// URL Parameters used for static filters.
export const static_config = {
  'q': 0,
  'qp': 1,
  'location_type': 2,
  'r': 3,
} as const;

// URL Parameters used for facet filters.
// Add the facet field as a key to enable faceting on that field.
export const facet_config =  {
  'paymentOptions': 0,
  'services': 1,
} as const;

// Convert a static filter fieldId to a URL param to distinguish location filter types.
export function locationFilterToType(filterId: string) {
  return filterId === "builtin.location" ? "location"
    : filterId === "builtin.region" ? "region"
    : "country";
};

// Convert a location filter type param to the actual location filter fieldId.
export function locationTypeToFilter(type: string) {
  return type === "location" ? "builtin.location"
    : type === "region" ? "builtin.region"
    : "address.countryCode";
}

export function useLoadInitialSearchParams(
  searchActions: SearchHeadless,
  searchParams: URLSearchParams,
  setSearchParams: SetSearchParamsType,
  callback?: () => void,
) {
  useEffect(() => {
    const loadUrlParams = async () => {
      // Load values from URL.
      const locationPlaceId = searchParams.get('q');
      const locationDisplayName = searchParams.get('qp');
      const filterType = searchParams.get('location_type');
      const radius = searchParams.get('r');

      // Load facets
      const facetParams = Array.from(searchParams.entries()).filter(([fieldId, _]) => Array.from(Object.keys(facet_config)).includes(fieldId));

      // If the locator is using "builtin.location" as the filterId for FilterSearch,
      // make sure we're loading in the correct type of location filter.
      const locationFilterId = LOCATOR_STATIC_FILTER_FIELD === "builtin.location"
        ? (filterType ? locationTypeToFilter(filterType) : LOCATOR_STATIC_FILTER_FIELD)
        : LOCATOR_STATIC_FILTER_FIELD;

      // Remove extra params added to the url that are not defined in facet_config or static_config.
      const extraParams = Array.from(searchParams.keys()).filter(key => !Array.from(Object.keys(static_config)).concat(Array.from(Object.keys(facet_config))).includes(key));
      for (const param of extraParams) {
        searchParams.delete(param);
      }
      setSearchParams(searchParams);

      // If the static filter value is available, set it in the filter state.
      if (locationPlaceId) {
        // If the filter displayName is "My Location", set a filter with value: NearFilterValue.
        if (locationDisplayName === "My Location") {
          // The filter value should be of the form `${lat},${lng}`.
          const [lat, lng] = locationPlaceId.split(',');

          // If lat and lat are valid, create the Near static filter.
          if (parseFloat(lat) && parseFloat(lng)) {
            searchActions.setStaticFilters([{
              displayName: locationDisplayName,
              filter: {
                fieldId: LOCATOR_STATIC_FILTER_FIELD,
                kind: 'fieldValue',
                matcher: Matcher.Near,
                value: {
                  lat: parseFloat(lat),
                  lng: parseFloat(lng),
                  radius: radius ? 1609 * parseInt(radius) : 1609 * GEOLOCATE_RADIUS,
                }
              },
              selected: true,
            }]);
          } else {
            // eslint-disable-next-line no-template-curly-in-string
            console.error("Invalid 'q' param, must be of form `${lat},${lng}`.");
          }
        }

        // Otherwise just set the static filter to be the value stored in the query param.
        else {
          searchActions.setStaticFilters([{
            ...(locationDisplayName ? {displayName: locationDisplayName} : {}),
            filter: {
              fieldId: locationFilterId,
              kind: 'fieldValue',
              matcher: Matcher.Equals,
              value: locationPlaceId,
            },
            selected: true,
          }]);
        }
      }

      // If the static filter value is missing, but the filter displayName is "My Location",
      // geolocate the user and use that to update the search state.
      if (!locationPlaceId && locationDisplayName === "My Location") {
        try {
          const position = await getUserLocation();

          // Update user location bias.
          searchActions.setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });

          // Create Near static filter
          searchActions.setStaticFilters([{
            displayName: locationDisplayName,
            filter: {
              fieldId: LOCATOR_STATIC_FILTER_FIELD,
              kind: 'fieldValue',
              matcher: Matcher.Near,
              value: {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                radius: radius ? 1609 * parseInt(radius) : 1609 * GEOLOCATE_RADIUS,
              }
            },
            selected: true,
          }]);
        } catch (e) {
          alert("User location could not be determined.");
          console.error(e);
        }
      }

      // If there is only a displayName value passed in, try to calculate the most likely
      // autocomplete option and use that for the field value.
      if (!locationPlaceId && locationDisplayName && locationDisplayName !== "My Location") {
        // Get FilterSearch autocomplete results for the displayName.
        const autocompleteOptions = await searchActions.executeFilterSearch(
          locationDisplayName,
          false,
          [{ fieldApiName: LOCATOR_STATIC_FILTER_FIELD, entityType: LOCATOR_ENTITY_TYPE, fetchEntities: true }],
        );

        // Use the first autocomplete result as the static filter.
        const topResult = autocompleteOptions?.sections[0].results[0];
        if (topResult?.filter) {
          searchActions.setStaticFilters([{
            displayName: topResult?.value,
            filter: {
              fieldId: topResult.filter.fieldId,
              kind: 'fieldValue',
              matcher: topResult.filter.matcher,
              value: topResult.filter.value,
            },
            selected: true,
          }]);
        }
      }

      // If any of the above functions set a static filter in the search state and there are facet params available,
      // parse the facet params and add them to the search state.
      if (searchActions.state.filters.static?.find(filter => filter.selected) && facetParams.length) {
        for (const [fieldId, options] of facetParams) {
          const optionsArray = options.split(',');
          const optionsToAdd: DisplayableFacetOption[] = optionsArray.map(option => ({
            count: 0,
            displayName: '',
            matcher: Matcher.Equals,
            value: option,
            selected: true,
          }));

          if (optionsToAdd.length) {
            searchActions.setFacets([{
              displayName: '',
              fieldId: fieldId,
              options: optionsToAdd
            }, ...(searchActions.state.filters.facets || [])]);
          }
        }
      }

      // Finally, if a static filter is set as selected in the search state run a search vertical search.
      if (searchActions.state.filters.static?.find(filter => filter.selected)) {
        try {
          await searchActions.executeVerticalQuery();
        } catch(error) {
          console.error(error);
        }
      }

      // If a callback prop is passed, invoke it now.
      // Useful for indicating that all the url params have been loaded.
      if (callback) {
        callback();
      }
    }
    loadUrlParams();
  }, [searchActions, searchParams, setSearchParams, callback]);
}

// When the search state facets are updated, add any facets with selected options to the URLSearchParams.
export function useUpdateFacetParams(
  searchActions: SearchHeadless,
  searchParams: URLSearchParams,
  setSearchParams: SetSearchParamsType,
) {
  useEffect(() => {
    const facetFilters = searchActions.state.filters.facets;

    if (facetFilters) {
      const activeFacets = facetFilters.filter(facet => facet.options.filter(f => f.selected).length);
      activeFacets.forEach(facet => {
        const fieldId = facet.fieldId;
        const activeOptions = facet.options.filter(f => f.selected).map(f => f.value).join(',');
        searchParams.set(fieldId, activeOptions);
      });

      setSearchParams(searchParams);
    }

  }, [searchActions.state.filters.facets, setSearchParams, searchParams]);
}
