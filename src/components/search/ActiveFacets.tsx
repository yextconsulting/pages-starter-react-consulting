import { DisplayableFacetOption, useSearchActions } from "@yext/search-headless-react";
import { executeSearch } from "@yext/search-ui-react";
import { MdClose } from "react-icons/md";

const ActiveFacets = () => {
  const searchActions = useSearchActions();
  const activeFacets = searchActions.state.filters.facets?.filter(facet => facet.options.filter(f => f.selected).length);
  const facetOptionButtons = activeFacets?.map(facet => facet.options
    .filter(option => option.selected)
    .map((option, idx) => <ActiveFacetOption facetFieldId={facet.fieldId} option={option} key={idx} />));

  return (
    <div className="-mr-4 -ml-[5px] sm:mx-0">
      <div className="flex w-full overflow-x-auto px-1 pb-4 sm:pb-0">
        {facetOptionButtons}
      </div>
    </div>
  );
}

type ActiveFacetOptionProps = {
  facetFieldId: string;
  option: DisplayableFacetOption;
}

const ActiveFacetOption = (props: ActiveFacetOptionProps) => {
  const searchActions = useSearchActions();
  const handleRemoveFacet = () => {
    searchActions.setFacetOption(props.facetFieldId, props.option, false);
    executeSearch(searchActions);
  }

  return (
    <button
      className="bg-brand-gray-100 hover:bg-brand-gray-200 rounded-3xl p-2.5 text-brand-primary text-sm flex items-center mx-[5px] whitespace-nowrap"
      onClick={handleRemoveFacet}
    >
      <MdClose height={8} width={8} className="mr-2" />
      <span>{props.option.displayName}</span>
    </button>
  )
}

export default ActiveFacets;
