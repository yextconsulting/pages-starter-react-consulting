import { MdClose } from "react-icons/md";
import { executeSearch } from "@yext/search-ui-react";
import {
  DisplayableFacetOption,
  useSearchActions,
} from "@yext/search-headless-react";

const ActiveFacets = () => {
  const searchActions = useSearchActions();
  const activeFacets = searchActions.state.filters.facets?.filter(
    (facet) => facet.options.filter((f) => f.selected).length
  );
  const facetOptionButtons = activeFacets?.map((facet) =>
    facet.options
      .filter((option) => option.selected)
      .map((option, idx) => (
        <FacetOptionButton
          facetFieldId={facet.fieldId}
          option={option}
          key={idx}
        />
      ))
  );

  if (!facetOptionButtons?.length) return null;

  return (
    <div className="mb-4 sm:mb-0 sm:mt-4">
      <div className="flex overflow-x-auto -mx-1.5 pb-3 -mb-3 -mr-4 sm:mr-0">
        {facetOptionButtons}
      </div>
    </div>
  );
};

type FacetOptionButtonProps = {
  facetFieldId: string;
  option: DisplayableFacetOption;
};

const FacetOptionButton = (props: FacetOptionButtonProps) => {
  const searchActions = useSearchActions();
  const handleRemoveFacet = () => {
    searchActions.setFacetOption(props.facetFieldId, props.option, false);
    executeSearch(searchActions);
  };

  return (
    <button
      className="bg-brand-gray-100 hover:bg-brand-gray-200 rounded-3xl p-2.5 text-brand-primary text-sm flex items-center mx-1.5 whitespace-nowrap"
      onClick={handleRemoveFacet}
    >
      <MdClose height={8} width={8} className="mr-2" />
      <span>{props.option.displayName}</span>
    </button>
  );
};

export default ActiveFacets;
