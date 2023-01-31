import { FilterSearch, executeSearch } from "@yext/search-ui-react";
import { useSearchActions } from "@yext/search-headless-react";
import { checkIsLocationFilter } from "src/components/search/utils/checkIsLocationFilter";
import { LOCATOR_STATIC_FILTER_FIELD, LOCATOR_ENTITY_TYPE } from "src/config";
import GeolocateButton from "src/components/search/GeolocateButton";

const searchFields = [
  { fieldApiName: LOCATOR_STATIC_FILTER_FIELD, entityType: LOCATOR_ENTITY_TYPE },
];

type SearchBoxProps = {
  title: string;
  subTitle: string;
  placeholderText?: string;
}

export default function SearchBox(props: SearchBoxProps) {
  const {
    title,
    subTitle,
    placeholderText,
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
              // Unselect selected matching filters.
              const matchingFilters = searchActions.state.filters.static?.filter(({ filter, selected }) => 
                selected
                && filter.kind === "fieldValue"
                && (LOCATOR_STATIC_FILTER_FIELD === "builtin.location" ? checkIsLocationFilter(filter) : searchFields.some(s => s.fieldApiName === filter.fieldId))
              ) ?? [];
              matchingFilters.forEach(f => searchActions.setFilterOption({ ...f, selected: false }));

              // Update the static filter state with the new filter.
              searchActions.setFilterOption({
                displayName: newDisplayName,
                filter: newFilter,
                selected: true
              });
              setCurrentFilter(newFilter);
              executeFilterSearch(newDisplayName);

              // Run new search with updated filter
              searchActions.setOffset(0);
              searchActions.resetFacets();
              executeSearch(searchActions);
            }}
          />
        </div>
        <GeolocateButton className="ml-4" />
      </div>
    </div>
  )
}
