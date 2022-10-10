import { FilterSearch, StandardFacets } from "@yext/search-ui-react";
import GeolocateButton from "./GeolocateButton";
import { LOCATOR_STATIC_FILTER_FIELD, LOCATOR_ENTITY_TYPE } from "src/common/consts";

const searchFields = [
  { fieldApiName: LOCATOR_STATIC_FILTER_FIELD, entityType: LOCATOR_ENTITY_TYPE },
];

type SearchBoxProps = {
  title: string,
  subTitle: string,
  placeholderText?: string,
}

export default function SearchBox(props: SearchBoxProps) {
  const { title, subTitle, placeholderText } = props;

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
            searchOnSelect={ true }
          />
        </div>
        <GeolocateButton className="ml-4" />
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
