import { FilterSearch, executeSearch } from "@yext/search-ui-react";
import { useSearchActions } from "@yext/search-headless-react";
import { LOCATOR_STATIC_FILTER_FIELD, LOCATOR_ENTITY_TYPE } from "src/config";
import GeolocateButton from "src/components/search/GeolocateButton";

const searchFields = [
  {
    fieldApiName: LOCATOR_STATIC_FILTER_FIELD,
    entityType: LOCATOR_ENTITY_TYPE,
  },
];

type SearchBoxProps = {
  title: string;
  subTitle: string;
  placeholderText?: string;
};

const SearchBox = (props: SearchBoxProps) => {
  const { title, subTitle, placeholderText } = props;

  const searchActions = useSearchActions();

  return (
    <div className="shadow-brand-shadow p-6">
      <h1 className="Heading--lead mb-4">{title}</h1>
      <div className="mb-2 text-brand-gray-400">{subTitle}</div>
      <div className="flex items-center">
        <div className="relative w-full h-9">
          <FilterSearch
            customCssClasses={{
              filterSearchContainer: "absolute w-full",
            }}
            label=""
            placeholder={placeholderText}
            searchFields={searchFields}
            onSelect={({
              currentFilter,
              executeFilterSearch,
              newDisplayName,
              newFilter,
              setCurrentFilter,
            }) => {
              // Update static filters.
              if (currentFilter) {
                searchActions.setFilterOption({
                  filter: currentFilter,
                  selected: false,
                });
              }
              searchActions.setFilterOption({
                filter: newFilter,
                displayName: newDisplayName,
                selected: true,
              });
              setCurrentFilter(newFilter);
              executeFilterSearch(newDisplayName);

              // Execute search on select.
              searchActions.setOffset(0);
              searchActions.resetFacets();
              executeSearch(searchActions);
            }}
          />
        </div>
        <GeolocateButton className="ml-4" />
      </div>
    </div>
  );
};

export default SearchBox;
