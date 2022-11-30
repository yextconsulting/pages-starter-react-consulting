import { FilterSearch, StandardFacets, executeSearch } from "@yext/search-ui-react";
import GeolocateButton from "./GeolocateButton";
import { LOCATOR_STATIC_FILTER_FIELD, LOCATOR_ENTITY_TYPE } from "src/config";
import { useSearchActions } from "@yext/search-headless-react";
import type { URLSearchParamsInit } from "react-router-dom";
import { checkIsLocationFilter } from "src/components/search/utils/checkIsLocationFilter";

const searchFields = [
  { fieldApiName: LOCATOR_STATIC_FILTER_FIELD, entityType: LOCATOR_ENTITY_TYPE },
];

type SearchBoxProps = {
  title: string,
  subTitle: string,
  placeholderText?: string,
  searchParams: URLSearchParams,
  setSearchParams: (nextInit: URLSearchParamsInit, navigateOptions?: {
    replace?: boolean | undefined;
    state?: any;
  } | undefined) => void,
}

export default function SearchBox(props: SearchBoxProps) {
  const {
    title,
    subTitle,
    placeholderText,
    searchParams,
    setSearchParams
  } = props;

  const searchActions = useSearchActions();

  return (
    <div className="shadow-brand-shadow p-6">
      <h1 className="Heading--lead mb-4">
        { title }
      </h1>
      <div className="mb-2 text-brand-gray-400">
        { subTitle }
      </div>
      <div className="flex items-center">
        <div className="relative w-full h-9">
          <FilterSearch
            customCssClasses={{
              filterSearchContainer: "absolute w-full",
            }}
            label=""
            placeholder={ placeholderText }
            searchFields={ searchFields }
            onSelect={({
              executeFilterSearch,
              newDisplayName,
              newFilter,
              setCurrentFilter,
            }) => {
              // Currently on load this component won't recognize a filter set from the url params when a
              // "builtin.region" or "address.countryCode" filter is being used since it only checks "builtin.location".
              // TODO: Product is working on a fix - check and remove comment when done.

              // Unselect selected matching filters.
              const matchingFilters = searchActions.state.filters.static?.filter(({ filter, selected }) => 
                selected
                && filter.kind === "fieldValue"
                && (LOCATOR_STATIC_FILTER_FIELD === "builtin.location" ? checkIsLocationFilter(filter) : searchFields.some(s => s.fieldApiName === filter.fieldId))
              ) ?? [];
              matchingFilters.forEach(f => searchActions.setFilterOption({ filter: f.filter, selected: false }));

              // Update the static filter state with the new filter.
              searchActions.setFilterOption({
                filter: newFilter,
                displayName: newDisplayName,
                selected: true
              });
              setCurrentFilter(newFilter);
              executeFilterSearch(newDisplayName);

              // Update URLSearchParams.
              searchParams.set('q', newFilter.value.toString());
              searchParams.set('qp', newDisplayName);

              // For builtin.location we need to also indicate the type of filter being used so it can be loaded in correctly.
              // TODO: When product updates the component check to make sure this isn't needed then.
              if (checkIsLocationFilter(newFilter)) {
                const type =
                  newFilter.fieldId === 'builtin.location' ? 'location'
                  : newFilter.fieldId === 'builtin.region' ? 'region'
                  : 'country';
                searchParams.set('filter_type', type);
              }

              setSearchParams(searchParams);

              // Run new search with updated filter
              searchActions.setOffset(0);
              searchActions.resetFacets();
              executeSearch(searchActions);
            }}
          />
        </div>
        <GeolocateButton
          className="ml-4"
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      </div>
      <StandardFacets
        collapsible={true}
        showOptionCounts={true}
        customCssClasses={{
          standardFacetsContainer: "pt-2",
          divider: "w-full h-px bg-gray-200 my-2"
        }}
        searchOnChange={true}
      />
    </div>
  )
}
