import { FilterSearch, executeSearch } from "@yext/search-ui-react";
import { useSearchActions } from "@yext/search-headless-react";
import { LOCATOR_STATIC_FILTER_FIELD, LOCATOR_ENTITY_TYPE } from "src/config";
import GeolocateButton from "src/components/search/GeolocateButton";
import { useEffect } from "react";
import { useLocatorRouter } from "./LocatorRouter";

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

export default function SearchBox(props: SearchBoxProps) {
  const { title, subTitle, placeholderText } = props;
  const { initialParamsLoaded } = useLocatorRouter();
  const searchActions = useSearchActions();

  // When the FilterSearch component updates the search state with the users selection execute a new search.
  useEffect(() => {
    if (!initialParamsLoaded) {
      return;
    }

    const removeListener = searchActions.addListener({
      valueAccessor: (state) => state.filters.static,
      callback: (filters) => {
        if (filters?.find((f) => f.selected)) {
          searchActions.setOffset(0);
          searchActions.resetFacets();
          executeSearch(searchActions);
        }
      },
    });

    return () => {
      removeListener();
    };
  }, [searchActions, initialParamsLoaded]);

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
            searchOnSelect={true}
          />
        </div>
        <GeolocateButton className="ml-4" />
      </div>
    </div>
  );
}
