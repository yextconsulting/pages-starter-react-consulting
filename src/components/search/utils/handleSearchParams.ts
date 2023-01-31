import { useEffect } from "react";
import {
  Matcher,
  useSearchActions
} from "@yext/search-headless-react";
import type {
  DisplayableFacetOption,
  DisplayableFacet,
  FieldValueStaticFilter,
  NearFilterValue,
  SearchHeadless,
  SelectableStaticFilter,
} from "@yext/search-headless-react";
import { getUserLocation } from "@yext/search-ui-react";
import {
  GEOLOCATE_RADIUS,
  LOCATOR_STATIC_FILTER_FIELD,
  LOCATOR_ENTITY_TYPE
} from "src/config";
import type { SetSearchParamsType } from "src/types/additional";
import { checkIsLocationFilter } from "src/components/search/utils/checkIsLocationFilter";
import {
  combineSearchParams,
  locationFilterToType,
  locationTypeToFilter,
} from "src/components/search/utils/helpers";

// URLSearchParams keys used for storing and loading search state.
// Any values not in this array will be removed from the URLSearchParams on page load.
export const FILTERS_CONFIG = [
  'q',
  'qp',
  'location_type',
  'lat',
  'lng',
  'r',
  'facets',
] as const;

// Schema for the facets search param value.
type FacetParamSchema = Record<string, string[]>;

export function useLoadInitialSearchParams(
  searchActions: SearchHeadless,
  searchParams: URLSearchParams,
  setSearchParams: SetSearchParamsType,
  paramsLoaded: boolean,
  callback?: () => void,
) {
  useEffect(() => {
    // Don't run again after params are loaded.
    if (paramsLoaded) return;

    const loadUrlParams = async () => {
      // Get values from URL.
      const query = searchParams.get('q');
      const prettyQuery = searchParams.get('qp');
      const locationType = searchParams.get('location_type');
      const lat = searchParams.get('lat');
      const lng = searchParams.get('lng');
      const radius = searchParams.get('r');
      const facets = searchParams.get('facets');

      // If the facets search param key exists, parse back into JSON.
      const parsedFacets = facets ? JSON.parse(facets) as FacetParamSchema : null;

      // If the locator is using 'builtin.location' as the filterId for FilterSearch,
      // load the correct corresponding filterId for the given location type.
      const locationFilterId = LOCATOR_STATIC_FILTER_FIELD === 'builtin.location' && locationType
        ? locationTypeToFilter(locationType)
        : LOCATOR_STATIC_FILTER_FIELD;

      // Remove extra params added to the url that are not defined in FILTERS_CONFIG.
      const unusedParams = Array.from(searchParams.keys()).filter(key => !FILTERS_CONFIG.some(val => val === key));
      if (unusedParams.length) {
        for (const param of unusedParams) {
          searchParams.delete(param);
        }
        setSearchParams(searchParams);
      }

      // If the filter value is available, set a filter with a string value in state.
      if (query) {
        searchActions.setStaticFilters([{
          displayName: prettyQuery ?? '',
          filter: {
            fieldId: locationFilterId,
            kind: 'fieldValue',
            matcher: Matcher.Equals,
            value: query,
          },
          selected: true,
        }]);
      }

      // If the lat and lng search params are available, set a filter with a NearFilterValue value in state.
      else if (lat && lng) {
        searchActions.setStaticFilters([{
          displayName: prettyQuery ?? '',
          filter: {
            fieldId: 'builtin.location',
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
      }

      // If the pretty query is "My Location", attempt to geolocate the user and
      // use their position to set a filter with a NearFilterValue value in state.
      else if (prettyQuery === 'My Location') {
        try {
          const position = await getUserLocation();

          // Update user location bias.
          searchActions.setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });

          // Create Near static filter
          searchActions.setStaticFilters([{
            displayName: prettyQuery,
            filter: {
              fieldId: 'builtin.location',
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
          alert('User location could not be determined.');
          console.error(e);
        }
      }

      // If only the pretty query is available, use it to find the top
      // autocomplete option and select that to set the filter in state.
      else if (prettyQuery) {
        // Get FilterSearch autocomplete results for the displayName.
        const autocompleteOptions = await searchActions.executeFilterSearch(
          prettyQuery,
          false,
          [{ fieldApiName: LOCATOR_STATIC_FILTER_FIELD, entityType: LOCATOR_ENTITY_TYPE, fetchEntities: false }],
        );

        // Use the first autocomplete result as the static filter.
        const topResult = autocompleteOptions?.sections[0].results[0];
        if (topResult?.filter) {
          searchActions.setStaticFilters([{
            displayName: topResult?.value ?? '',
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
      if (searchActions.state.filters.static?.find(filter => filter.selected) && parsedFacets) {
        for (const [fieldId, options] of Object.entries(parsedFacets)) {
          const optionsToAdd: DisplayableFacetOption[] = options.map(option => ({
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
  }, [searchActions, searchParams, setSearchParams, paramsLoaded, callback]);
}

export function encodeStaticFilters(filters: SelectableStaticFilter[]): URLSearchParams|null {
  const selectedFilter = filters.find(f => f.selected && f.filter.kind === 'fieldValue');
  
  if (!selectedFilter) return null;

  const searchParams = new URLSearchParams();
  const activeFilter = selectedFilter?.filter as FieldValueStaticFilter;

  if (selectedFilter?.displayName) {
    searchParams.set('qp', selectedFilter?.displayName);
  }
  if (activeFilter.matcher === Matcher.Equals) {
    searchParams.set('q', activeFilter.value.toString());

    if (checkIsLocationFilter(activeFilter)) {
      searchParams.set('location_type', locationFilterToType(activeFilter.fieldId));
    }
  }
  if (activeFilter.matcher === Matcher.Near) {
    const filterValue = activeFilter.value as NearFilterValue;
    searchParams.set('lat', filterValue.lat.toString());
    searchParams.set('lng', filterValue.lng.toString());
    searchParams.set('r', (Math.round(filterValue.radius / 1609)).toString());
  }

  return searchParams;
}

export function encodeFacetFilters(facets: DisplayableFacet[]): URLSearchParams|null {
  const activeFacets: FacetParamSchema = {};

  facets.forEach(facet => {
    const isActive = facet.options.some(option => option.selected);
    if (isActive) {
      const activeOptions = facet.options
        .filter(f => f.selected)
        .map(f => f.value)
        .filter((val): val is string => typeof val === 'string');

      activeFacets[facet.fieldId] = activeOptions;
    }
  });

  if (Object.keys(activeFacets).length) {
    const searchParams = new URLSearchParams({facets: JSON.stringify(activeFacets)});
    return searchParams;
  }

  return null;
}

export function useHandleSearchParams (
  initialParamsLoaded: boolean,
  searchParams: URLSearchParams,
  setSearchParams: SetSearchParamsType,
) {
  const searchActions = useSearchActions();

  useEffect(() => {
    // Don't register listeners on page load until all of the initial params are loaded.
    if (!initialParamsLoaded) return;

    searchActions.addListener({
      valueAccessor: state => state.filters.static,
      callback: filters => {
        if (filters) {
          const encodedFilters = encodeStaticFilters(filters);
          if (encodedFilters) {
            setSearchParams(combineSearchParams(searchParams, encodedFilters));
          }
        }
      }
    });

    searchActions.addListener({
      valueAccessor: state => state.filters.facets,
      callback: facets => {
        if (facets) {
          const encodedFacets = encodeFacetFilters(facets);
          if (encodedFacets) {
            setSearchParams(combineSearchParams(searchParams, encodedFacets));
          }
        }
      },
    });

    // On a new search the facets are reset so remove the facets key from the search params.
    searchActions.addListener({
      valueAccessor: state => state.query.queryId,
      callback: _ => {
        searchParams.delete('facets');
        setSearchParams(searchParams);
      },
    });

  }, [searchActions, searchParams, setSearchParams, initialParamsLoaded]);
}
