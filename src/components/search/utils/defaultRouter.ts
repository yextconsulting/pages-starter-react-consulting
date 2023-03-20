import {
  FiltersState,
  SearchActions,
  FieldValueStaticFilter,
  Matcher,
  NearFilterValue,
  DisplayableFacetOption,
  SearchHeadless,
} from "@yext/search-headless-react";
import { getUserLocation } from "@yext/search-ui-react";
import {
  GEOLOCATE_RADIUS,
  LOCATOR_ENTITY_TYPE,
  LOCATOR_STATIC_FILTER_FIELD,
} from "src/config";
import { checkIsLocationFilter } from "./checkIsLocationFilter";
import { locationFilterToType, locationTypeToFilter } from "./helpers";

export interface Router {
  serializeState: (state: FiltersState) => URLSearchParams;
  deserializeParams: (
    params: URLSearchParams,
    actions: SearchActions
  ) => Promise<void>;
}

export const defaultRouter: Router = {
  deserializeParams: async (params, searchActions) => {
    // Get values from URL.
    const query = params.get("q");
    const prettyQuery = params.get("qp");
    const locationType = params.get("location_type");
    const lat = params.get("lat");
    const lng = params.get("lng");
    const radius = params.get("r");
    const facets = params.get("facets");

    // If the facets search param key exists, parse back into JSON.
    const parsedFacets = facets
      ? (JSON.parse(facets) as Record<string, string[]>)
      : null;

    // If the locator is using 'builtin.location' as the filterId for FilterSearch,
    // load the correct corresponding filterId for the given location type.
    const filterFieldId =
      LOCATOR_STATIC_FILTER_FIELD === "builtin.location" && locationType
        ? locationTypeToFilter(locationType)
        : LOCATOR_STATIC_FILTER_FIELD;

    // If the filter value is available, set a filter with a string value in state.
    if (query) {
      searchActions.setStaticFilters([
        {
          displayName: prettyQuery ?? "",
          filter: {
            fieldId: filterFieldId,
            kind: "fieldValue",
            matcher: Matcher.Equals,
            value: query,
          },
          selected: true,
        },
      ]);
    }

    // If the lat and lng search params are available, set a filter with a NearFilterValue value in state.
    else if (lat && lng) {
      searchActions.setStaticFilters([
        {
          displayName: prettyQuery ?? "",
          filter: {
            fieldId: "builtin.location",
            kind: "fieldValue",
            matcher: Matcher.Near,
            value: {
              lat: parseFloat(lat),
              lng: parseFloat(lng),
              radius: radius
                ? 1609 * parseInt(radius)
                : 1609 * GEOLOCATE_RADIUS,
            },
          },
          selected: true,
        },
      ]);
    }

    // If the pretty query is "My Location", attempt to geolocate the user and
    // use their position to set a filter with a NearFilterValue value in state.
    else if (prettyQuery === "My Location") {
      await geolocateUser(searchActions, radius);
    }

    // If only the pretty query is available, use it to find the top
    // autocomplete option and select that to set the filter in state.
    else if (prettyQuery) {
      await autocompletePrettyQuery(searchActions, prettyQuery);
    }

    // If any of the above functions set a static filter in the search state and there are facet params available,
    // parse the facet params and add them to the search state.
    if (
      searchActions.state.filters.static?.find((filter) => filter.selected) &&
      parsedFacets
    ) {
      for (const [fieldId, options] of Object.entries(parsedFacets)) {
        const optionsToAdd: DisplayableFacetOption[] = options.map(
          (option) => ({
            count: 0,
            displayName: "",
            matcher: Matcher.Equals,
            value: option,
            selected: true,
          })
        );

        if (optionsToAdd.length) {
          searchActions.setFacets([
            {
              displayName: "",
              fieldId: fieldId,
              options: optionsToAdd,
            },
            ...(searchActions.state.filters.facets || []),
          ]);
        }
      }
    }

    // Finally, if a static filter is set as selected in the search state run a search vertical search.
    if (searchActions.state.filters.static?.find((filter) => filter.selected)) {
      try {
        await searchActions.executeVerticalQuery();
      } catch (error) {
        console.error(error);
      }
    }
  },
  serializeState: (filters) => {
    const params = new URLSearchParams();

    const selectedFilter = filters.static?.find(
      (f) => f.selected && f.filter.kind === "fieldValue"
    );

    if (!selectedFilter) {
      return params;
    }

    if (selectedFilter?.displayName) {
      params.set("qp", selectedFilter?.displayName);
    }

    const fieldValueFilter = selectedFilter?.filter as FieldValueStaticFilter;

    if (fieldValueFilter.matcher === Matcher.Equals) {
      params.set("q", fieldValueFilter.value.toString());

      if (checkIsLocationFilter(fieldValueFilter)) {
        params.set(
          "location_type",
          locationFilterToType(fieldValueFilter.fieldId)
        );
      }
    }

    if (fieldValueFilter.matcher === Matcher.Near) {
      const filterValue = fieldValueFilter.value as NearFilterValue;
      params.set("lat", filterValue.lat.toString());
      params.set("lng", filterValue.lng.toString());
      params.set("r", Math.round(filterValue.radius / 1609).toString());
    }

    const facets = filters.facets;

    if (!facets) {
      return params;
    }

    const activeFacets: Record<string, string[]> = {};

    facets.forEach((facet) => {
      if (facet.options.some((option) => option.selected)) {
        const activeOptions = facet.options
          .filter(
            (option) => option.selected && typeof option.value === "string"
          )
          .map((option) => option.value.toString());

        activeFacets[facet.fieldId] = activeOptions;
      }
    });

    if (Object.keys(activeFacets).length) {
      params.set("facets", JSON.stringify(activeFacets));
    }

    return params;
  },
};

const geolocateUser = async (
  searchActions: SearchHeadless,
  radius?: string | null
) => {
  try {
    const position = await getUserLocation();

    // Update user location bias.
    searchActions.setUserLocation({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });

    // Create Near static filter
    searchActions.setStaticFilters([
      {
        displayName: "My Location",
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
      },
    ]);
  } catch (e) {
    alert("User location could not be determined.");
    console.error(e);
  }
};

const autocompletePrettyQuery = async (
  searchActions: SearchHeadless,
  prettyQuery: string
) => {
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
    searchActions.setStaticFilters([
      {
        displayName: topResult.value,
        filter: {
          fieldId: topResult.filter.fieldId,
          kind: "fieldValue",
          matcher: topResult.filter.matcher,
          value: topResult.filter.value,
        },
        selected: true,
      },
    ]);
  }
};
