import { useEffect, useState } from "react";
import { useSearchActions } from "@yext/search-headless-react";
import { MdFilterList } from "react-icons/md";
import ErrorBoundaryWithAnalytics from "src/components/common/ErrorBoundaryWithAnalytics";
import { useBreakpoint } from "src/common/useBreakpoints";
import ActiveFacets from "./ActiveFacets";
import FacetsModal from "./FacetsModal";
import ResultSummary from "./ResultSummary";

const ResultInfo = () => {
  return (
    <ErrorBoundaryWithAnalytics name="resultinfo" noAnalyticsScope={true}>
      <ResultInfoInternal />
    </ErrorBoundaryWithAnalytics>
  );
};

const ResultInfoInternal = () => {
  const isDesktop = useBreakpoint("sm");
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setFiltersOpen(false);
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <div className="shadow-brand-shadow py-4 px-6">
      {filtersOpen && !isDesktop && (
        <div
          className="fixed top-0 left-0 h-screen w-screen opacity-30 bg-black z-10"
          onClick={() => setFiltersOpen(false)}
        ></div>
      )}
      <div className="flex items-center">
        <ResultSummary />
        <FiltersButton
          filtersOpen={filtersOpen}
          setFiltersOpen={setFiltersOpen}
        />
      </div>
      {isDesktop && <ActiveFacets />}
      {filtersOpen && <FacetsModal setFiltersOpen={setFiltersOpen} />}
    </div>
  );
};

type FiltersButtonProps = {
  filtersOpen: boolean;
  setFiltersOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const FiltersButton = ({ filtersOpen, setFiltersOpen }: FiltersButtonProps) => {
  const searchActions = useSearchActions();
  const facets = searchActions.state.filters.facets;
  const facetsAvailable = facets?.filter((facet) => facet.options.length).length
    ? true
    : false;
  const numActiveFacets = facets
    ?.map((facet) => facet.options.filter((option) => option.selected).length)
    .reduce((prev, curr) => prev + curr, 0);

  if (!facetsAvailable) return null;

  return (
    <button
      className="flex items-center ml-auto"
      onClick={() => setFiltersOpen(!filtersOpen)}
    >
      <span className="text-brand-primary mr-2.5 whitespace-nowrap">
        {`Filters ${numActiveFacets ? `(${numActiveFacets})` : ""}`}
      </span>
      <MdFilterList className="text-brand-primary" />
    </button>
  );
};

export default ResultInfo;
