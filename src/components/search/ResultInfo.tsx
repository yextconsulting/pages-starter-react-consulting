import { useState } from "react";
import { useSearchActions } from "@yext/search-headless-react";
import { useBreakpoint } from "src/common/useBreakpoints";
import { MdFilterList } from "react-icons/md";
import ResultSummary from "src/components/search/ResultSummary";
import FacetsModal from "src/components/search/FacetsModal";
import ActiveFacets from "src/components/search/ActiveFacets";

const ResultInfo = () => {
  const isDesktop = useBreakpoint("sm");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const searchActions = useSearchActions();
  const facets = searchActions.state.filters.facets;
  const facetsAvailable = facets?.filter(facet => facet.options.length).length ? true : false;
  const numActiveFacets = facets?.map(facet => facet.options
    .filter(f => f.selected).length)
    .reduce((prev, curr) => prev + curr, 0);
  
  return (
    <div className="shadow-brand-shadow py-4 px-6">
      {filtersOpen && !isDesktop && <div className="fixed top-0 left-0 h-screen w-screen opacity-30 bg-black"></div>}
      <div className="flex items-center mb-4">
        <ResultSummary />
        {facetsAvailable && (
          <button
            className="flex items-center ml-auto"
            onClick={() => setFiltersOpen(!filtersOpen)}
          >
            <span className="text-brand-primary mr-2.5 whitespace-nowrap">
              {`Filters ${numActiveFacets ? `(${numActiveFacets})` : ''}`}
            </span>
            <MdFilterList className="text-brand-primary" />
          </button>
        )}
      </div>
      {filtersOpen && <FacetsModal setFiltersOpen={setFiltersOpen} />}
      {isDesktop && <ActiveFacets />}
    </div>
  );
}

export default ResultInfo;
