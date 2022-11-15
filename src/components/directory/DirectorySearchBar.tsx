import { getSearchProviderConfig, LOCATOR_ENTITY_TYPE, LOCATOR_STATIC_FILTER_FIELD } from "src/config";
import { useTemplateData } from "src/common/useTemplateData";
import { provideHeadless, SearchHeadlessProvider } from "@yext/search-headless-react";
import { SandboxEndpoints, useSearchState } from "@yext/search-headless-react";
import { FilterSearch } from "@yext/search-ui-react";
import { useEffect } from "react";
import GeolocateButton from "src/components/search/GeolocateButton";

const searchFields = [
  { fieldApiName: LOCATOR_STATIC_FILTER_FIELD, entityType: LOCATOR_ENTITY_TYPE },
];

interface DirectorySearchBarProps {
  placeholder: string
  searcherPath: string
}

export function DirectorySearchBar(props: DirectorySearchBarProps) {
  const { document } = useTemplateData();

  const searcher = provideHeadless({
    ...getSearchProviderConfig(document._site.c_searchExperienceAPIKey ?? '', document.meta.locale),
    // endpoints: SandboxEndpoints // Add if using a sandbox account
  });

  return (
    <SearchHeadlessProvider searcher={searcher}>
      <DirectorySearchBarInternal {...props}/>
    </SearchHeadlessProvider>
  );
}

function DirectorySearchBarInternal(props: DirectorySearchBarProps) {
  const {
    placeholder,
    searcherPath,
  } = props;

  const searchState = useSearchState(s => s);

  useEffect(() => {
    const staticFilters = searchState.filters.static;

    if (staticFilters) {
      const selectedFilter = staticFilters.find(f => f.selected && f.filter.kind === "fieldValue");

      if (selectedFilter && selectedFilter.filter.kind === "fieldValue") {
        const urlParams = new URLSearchParams();
        // stringify the geolocation filter value if present
        urlParams.set('q', typeof(selectedFilter.filter.value) === "string" ? selectedFilter.filter.value : JSON.stringify(selectedFilter.filter.value));
        if (selectedFilter.displayName) {
          urlParams.set('qp', selectedFilter.displayName);
        }
        window.location.href = `${searcherPath}?${urlParams.toString()}`;
      }
    }
  }, [searchState.query.queryId]);

  return (
    <div className="flex items-center justify-center">
      <div className="relative w-[350px!important] justify-center h-[54px]">
        <FilterSearch
          customCssClasses={{
            filterSearchContainer: "absolute w-full mb-0",
            inputElement: 'p-4 text-sm h-auto',
          }}
          label=""
          placeholder={ placeholder }
          searchFields={ searchFields }
          searchOnSelect={ true }
          key="directory-search"
        />
      </div>
      <GeolocateButton className="ml-4" />
    </div>
  );
}
