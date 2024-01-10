/**
 * The encoding and decoding between search state static + facet filters and URLSearchParams.
 */

import type {
  DisplayableFacetOption,
  DisplayableFacet,
  FieldValueStaticFilter,
  NearFilterValue,
  SelectableStaticFilter,
  SearchHeadless,
} from "@yext/search-headless-react";
import { Matcher } from "@yext/search-headless-react";
import { getUserLocation } from "@yext/search-ui-react";
import {
  GEOLOCATE_RADIUS,
  LOCATOR_ENTITY_TYPE,
  LOCATOR_STATIC_FILTER_FIELD,
} from "src/config";
import { checkIsLocationFilter } from "./checkIsLocationFilter";
import { locationFilterToType, locationTypeToFilter } from "./helpers";

// Encode search state.filters.static -> URLSearchParams
export function encodeStaticFilters(filters: SelectableStaticFilter[]) {
  const selectedFilter = filters.find(
    (f) => f.selected && f.filter.kind === "fieldValue"
  );

  if (!selectedFilter) return null;

  const searchParams = new URLSearchParams();
  const activeFilter = selectedFilter?.filter as FieldValueStaticFilter;

  if (selectedFilter?.displayName) {
    searchParams.set("qp", selectedFilter?.displayName);
  }
  if (activeFilter.matcher === Matcher.Equals) {
    searchParams.set("q", activeFilter.value.toString());

    if (checkIsLocationFilter(activeFilter)) {
      searchParams.set(
        "location_type",
        locationFilterToType(activeFilter.fieldId)
      );
    }
  }
  if (activeFilter.matcher === Matcher.Near) {
    const filterValue = activeFilter.value as NearFilterValue;
    searchParams.set("lat", filterValue.lat.toString());
    searchParams.set("lng", filterValue.lng.toString());
    searchParams.set("r", Math.round(filterValue.radius / 1609).toString());
  }

  return searchParams;
}

// Decode URLSearchParams -> search state.filters.static
export async function decodeStaticFilters(
  searchParams: URLSearchParams,
  searchActions: SearchHeadless
) {
  // Get values from URL.
  const query = searchParams.get("q");
  const prettyQuery = searchParams.get("qp");
  const locationType = searchParams.get("location_type");
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const radius = searchParams.get("r");

  // If the locator is using 'builtin.location' as the filterId for FilterSearch,
  // load the correct corresponding filterId for the given location type.
  const locationFilterId =
    LOCATOR_STATIC_FILTER_FIELD === "builtin.location" && locationType
      ? locationTypeToFilter(locationType)
      : LOCATOR_STATIC_FILTER_FIELD;

  let staticFilter: SelectableStaticFilter | null = null;

  // If the filter value is available, set a filter with a string value in state.
  if (query) {
    staticFilter = {
      displayName: prettyQuery ?? "",
      filter: {
        fieldId: locationFilterId,
        kind: "fieldValue",
        matcher: Matcher.Equals,
        value: query,
      },
      selected: true,
    };
  }

  // If the lat and lng search params are available, set a filter with a NearFilterValue value in state.
  else if (lat && lng) {
    staticFilter = {
      displayName: prettyQuery ?? "",
      filter: {
        fieldId: "builtin.location",
        kind: "fieldValue",
        matcher: Matcher.Near,
        value: {
          lat: parseFloat(lat),
          lng: parseFloat(lng),
          radius: radius ? 1609 * parseInt(radius) : 1609 * GEOLOCATE_RADIUS,
        },
      },
      selected: true,
    };
  }

  // If the pretty query is "My Location", attempt to geolocate the user and
  // use their position to set a filter with a NearFilterValue value in state.
  else if (prettyQuery === "My Location") {
    try {
      const position = await getUserLocation();

      // Update user location bias.
      // Does this need to happen though?
      searchActions.setUserLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });

      // Create Near static filter
      staticFilter = {
        displayName: prettyQuery,
        filter: {
          fieldId: "builtin.location",
          kind: "fieldValue",
          matcher: Matcher.Near,
          value: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            radius: radius ? 1609 * parseInt(radius) : 1609 * GEOLOCATE_RADIUS,
          },
        },
        selected: true,
      };
    } catch (e) {
      alert("User location could not be determined.");
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
      [
        {
          fieldApiName: LOCATOR_STATIC_FILTER_FIELD,
          entityType: LOCATOR_ENTITY_TYPE,
          fetchEntities: false,
        },
      ]
    );

    // Use the first autocomplete result as the static filter.
    const topResult = autocompleteOptions?.sections[0].results[0];
    if (topResult?.filter) {
      staticFilter = {
        displayName: topResult.value,
        filter: {
          fieldId: topResult.filter.fieldId,
          kind: "fieldValue",
          matcher: topResult.filter.matcher,
          value: topResult.filter.value,
        },
        selected: true,
      };
    }
  }

  return staticFilter;
}

// Schema for the facets search param value.
type FacetParamSchema = Record<string, string[]>;

// Encode search state.filters.static -> URLSearchParams
export function encodeFacetFilters(facets: DisplayableFacet[]) {
  const activeFacets: FacetParamSchema = {};

  facets.forEach((facet) => {
    const isActive = facet.options.some((option) => option.selected);
    if (isActive) {
      const activeOptions = facet.options
        .filter((f) => f.selected)
        .map((f) => f.value)
        .filter((val): val is string => typeof val === "string");

      activeFacets[facet.fieldId] = activeOptions;
    }
  });

  if (Object.keys(activeFacets).length) {
    const searchParams = new URLSearchParams({
      facets: JSON.stringify(activeFacets),
    });
    return searchParams;
  }

  return null;
}

// Decode URLSearchParams -> search state.filters.facets
export function decodeFacetFilters(searchParams: URLSearchParams) {
  const facets = searchParams.get("facets");
  // If the facets search param key exists, parse back into JSON.
  const parsedFacets = facets ? (JSON.parse(facets) as FacetParamSchema) : null;

  let facetFilters: DisplayableFacet[] = [];

  if (parsedFacets) {
    for (const [fieldId, options] of Object.entries(parsedFacets)) {
      const optionsToAdd: DisplayableFacetOption[] = options.map((option) => ({
        count: 0,
        displayName: option,
        matcher: Matcher.Equals,
        value: option,
        selected: true,
      }));

      if (optionsToAdd.length) {
        facetFilters.push({
          displayName: "",
          fieldId: fieldId,
          options: optionsToAdd,
        });
      }
    }
  }

  return facetFilters;
}
