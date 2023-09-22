import {
  getSearchProvider,
  LOCATOR_ENTITY_TYPE,
  LOCATOR_STATIC_FILTER_FIELD,
} from "src/config";
import { useTemplateData } from "src/common/useTemplateData";
import { SearchHeadlessProvider } from "@yext/search-headless-react";
import { FilterSearch } from "@yext/search-ui-react";
import GeolocateButton from "src/components/search/GeolocateButton";
import { encodeStaticFilters } from "src/components/search/utils/handleSearchParams";

const searchFields = [
  {
    fieldApiName: LOCATOR_STATIC_FILTER_FIELD,
    entityType: LOCATOR_ENTITY_TYPE,
  },
];

interface DirectorySearchBarProps {
  placeholder: string;
  searcherPath: string;
}

const DirectorySearchBar = (props: DirectorySearchBarProps) => {
  const { document } = useTemplateData();

  if (!document._site.c_searchExperienceAPIKey) {
    console.error("Add the search experience API key to the Site Entity");
  }

  const searcher = getSearchProvider(
    document._site.c_searchExperienceAPIKey ?? "",
    document.meta.locale,
    document.siteDomain
  );

  return (
    <SearchHeadlessProvider searcher={searcher}>
      <DirectorySearchBarInternal {...props} />
    </SearchHeadlessProvider>
  );
};

const DirectorySearchBarInternal = (props: DirectorySearchBarProps) => {
  const { placeholder, searcherPath } = props;

  return (
    <div className="flex items-center justify-center">
      <div className="relative w-[350px!important] justify-center h-[54px]">
        <FilterSearch
          customCssClasses={{
            filterSearchContainer: "absolute w-full mb-0",
            inputElement: "p-4 text-sm h-auto",
          }}
          label=""
          placeholder={placeholder}
          searchFields={searchFields}
          key="directory-search"
          onSelect={({ newDisplayName, newFilter }) => {
            const searchParams = encodeStaticFilters([
              {
                displayName: newDisplayName,
                filter: newFilter,
                selected: true,
              },
            ]);

            if (searchParams) {
              window.location.href = `${searcherPath}?${searchParams.toString()}`;
            }
          }}
        />
      </div>
      <GeolocateButton
        className="ml-4"
        redirectToSearchPage={true}
        searcherPath={searcherPath}
      />
    </div>
  );
};

export default DirectorySearchBar;
