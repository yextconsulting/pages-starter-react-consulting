import type {
  DisplayableFacet,
  DisplayableFacetOption,
  FieldValueStaticFilter,
  NearFilterValue,
  SearchHeadless,
  SelectableStaticFilter,
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

export function encodeStaticFilters(filters: SelectableStaticFilter[]) {
  const selectedFilter = filters.find(
    (f) => f.selected && f.filter.kind === "fieldValue"
  );

  if (!selectedFilter) return null;

  const searchParams = new URLSearchParams();
  const activeFilter = selectedFilter.filter as FieldValueStaticFilter;

  if (selectedFilter.displayName) {
    searchParams.set("qp", selectedFilter.displayName);
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

export async function decodeStaticFilters(
  searchParams: URLSearchParams,
  searchActions: SearchHeadless
) {
  const query = searchParams.get("q");
  const prettyQuery = searchParams.get("qp");
  const locationType = searchParams.get("location_type");
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const radius = searchParams.get("r");

  const locationFilterId =
    LOCATOR_STATIC_FILTER_FIELD === "builtin.location" && locationType
      ? locationTypeToFilter(locationType)
      : LOCATOR_STATIC_FILTER_FIELD;

  let staticFilter: SelectableStaticFilter | null = null;

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
  } else if (lat && lng) {
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
  } else if (prettyQuery === "My Location") {
    try {
      const position = await getUserLocation();

      searchActions.setUserLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });

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
    } catch (error) {
      alert("User location could not be determined.");
      console.error(error);
    }
  } else if (prettyQuery) {
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

type FacetParamSchema = Record<string, string[]>;

export function encodeFacetFilters(facets: DisplayableFacet[]) {
  const activeFacets: FacetParamSchema = {};

  facets.forEach((facet) => {
    const isActive = facet.options.some((option) => option.selected);
    if (isActive) {
      const activeOptions = facet.options
        .filter((option) => option.selected)
        .map((option) => option.value)
        .filter((value): value is string => typeof value === "string");

      activeFacets[facet.fieldId] = activeOptions;
    }
  });

  if (Object.keys(activeFacets).length) {
    return new URLSearchParams({
      facets: JSON.stringify(activeFacets),
    });
  }

  return null;
}

export function decodeFacetFilters(searchParams: URLSearchParams) {
  const facets = searchParams.get("facets");
  const parsedFacets = facets ? (JSON.parse(facets) as FacetParamSchema) : null;

  const facetFilters: DisplayableFacet[] = [];

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
          fieldId,
          options: optionsToAdd,
        });
      }
    }
  }

  return facetFilters;
}
