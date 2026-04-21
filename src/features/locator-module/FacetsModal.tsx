import { useSearchActions } from "@yext/search-headless-react";
import { executeSearch } from "@yext/search-ui-react";
import { FaTimes } from "react-icons/fa";
import { useBreakpoint } from "src/common/useBreakpoints";
import { Facets } from "src/components/search/Facets/Facets";
import ActiveFacets from "./ActiveFacets";

type FacetsModalProps = {
  setFiltersOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const FacetsModal = ({ setFiltersOpen }: FacetsModalProps) => {
  const isDesktop = useBreakpoint("sm");
  const searchActions = useSearchActions();
  const facets = searchActions.state.filters.facets;

  const handleClearAllFacets = () => {
    searchActions.resetFacets();
    executeSearch(searchActions);
    setFiltersOpen(false);
  };

  return (
    <div className="Locator-facetsModal">
      <div className="flex items-center mb-4">
        <h3 className="text-lg font-bold text-brand-primary">
          Refine Your Search
        </h3>
        <button className="ml-auto" onClick={() => setFiltersOpen(false)}>
          <FaTimes className="text-brand-primary" />
        </button>
      </div>
      {!isDesktop && <ActiveFacets />}
      <div className="h-px bg-brand-gray-300 w-screen -mx-4 mb-4 sm:mx-0 sm:w-full">
        {/* Divider */}
      </div>
      <div className="overflow-y-auto">
        <Facets
          collapsible={false}
          searchOnChange={true}
          showOptionCounts={true}
        />
      </div>
      <div className="text-center mt-6">
        <button
          className="link-primary disabled:text-brand-gray-400"
          disabled={
            facets?.filter(
              (facet) =>
                facet.options.filter((option) => option.selected).length
            ).length
              ? false
              : true
          }
          onClick={handleClearAllFacets}
        >
          Clear All
        </button>
      </div>
    </div>
  );
};

export default FacetsModal;
