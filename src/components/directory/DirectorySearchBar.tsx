import { getSearchProviderConfig, LOCATOR_ENTITY_TYPE, LOCATOR_STATIC_FILTER_FIELD } from "src/config";
import { useTemplateData } from "src/common/useTemplateData";
import { provideHeadless, SearchHeadlessProvider } from "@yext/search-headless-react";
import { SandboxEndpoints } from "@yext/search-headless-react";
import { FilterSearch } from "@yext/search-ui-react";
import GeolocateButton from "src/components/search/GeolocateButton";
import { checkIsLocationFilter } from "src/components/search/utils/checkIsLocationFilter";


const searchFields = [
  { fieldApiName: LOCATOR_STATIC_FILTER_FIELD, entityType: LOCATOR_ENTITY_TYPE },
];

interface DirectorySearchBarProps {
  placeholder: string;
  searcherPath: string;
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
          key="directory-search"
          onSelect={({
            newDisplayName,
            newFilter,
          }) => {
            const searchParams = new URLSearchParams();
            searchParams.set('q', newFilter.value.toString());
            searchParams.set('qp', newDisplayName);
            if (checkIsLocationFilter(newFilter)) {
              const type =
                newFilter.fieldId === 'builtin.location' ? 'location'
                : newFilter.fieldId === 'builtin.region' ? 'region'
                : 'country';

              searchParams.set('filter_type', type);
            }

            // Redirect to the search page.
            window.location.href = `${searcherPath}?${searchParams.toString()}`;
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
}
