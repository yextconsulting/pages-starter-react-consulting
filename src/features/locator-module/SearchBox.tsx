import { useSearchActions } from "@yext/search-headless-react";
import { executeSearch, FilterSearch } from "@yext/search-ui-react";
import ErrorBoundaryWithAnalytics from "src/components/common/ErrorBoundaryWithAnalytics";
import { LOCATOR_ENTITY_TYPE, LOCATOR_STATIC_FILTER_FIELD } from "src/config";
import GeolocateButton from "./GeolocateButton";

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
  return (
    <ErrorBoundaryWithAnalytics name="searchbox" noAnalyticsScope={true}>
      <SearchBoxInternal {...props} />
    </ErrorBoundaryWithAnalytics>
  );
};

const SearchBoxInternal = ({
  title,
  subTitle,
  placeholderText,
}: SearchBoxProps) => {
  const searchActions = useSearchActions();

  return (
    <div className="shadow-brand-shadow p-6">
      <h1 className="heading heading-lead mb-4">{title}</h1>
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
