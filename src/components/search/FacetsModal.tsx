import { useBreakpoint } from "src/common/useBreakpoints";
import ActiveFacets from "./ActiveFacets";
import { facet_config } from "src/components/search/utils/handleSearchParams";
import { useSearchActions } from "@yext/search-headless-react";
import { StandardFacets, executeSearch,  } from "@yext/search-ui-react";
import { FaTimes} from "react-icons/fa";

type FacetsModalProps = {
  setFiltersOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const FacetsModal = (props: FacetsModalProps) => {
  const isDesktop = useBreakpoint("sm");
  const searchActions = useSearchActions();
  const facets = searchActions.state.filters.facets;

  const handleClearAllFacets = () => {
    searchActions.resetFacets();
    executeSearch(searchActions);
    props.setFiltersOpen(false);
  }

  return (
    <div className="Locator-facetsModal">
      <div className="flex items-center mb-4">
        <h3 className="text-lg font-bold text-brand-primary">
          Refine Your Search
        </h3>
        <button
          className="ml-auto"
          onClick={() => props.setFiltersOpen(false)}
        >
          <FaTimes className="text-brand-primary" />
        </button>
      </div>
      {!isDesktop && (
        <div>
          <ActiveFacets />
        </div>
      )}
      <div className="border-t border-brand-gray-300 w-full -mx-4 sm:mx-0 mb-4">{/* Divider */}</div>
      <div>
        <StandardFacets
          collapsible={false}
          showOptionCounts={true}
          customCssClasses={{
            titleLabel: "text-lg font-bold text-brand-primary",
            optionLabel: "text-sm",
          }}
          searchOnChange={true}
          // Exclude all facets that aren't defined in the facet_config object.
          excludedFieldIds={facets?.filter(facet => !Array.from(Object.keys(facet_config)).includes(facet.fieldId)).map(facet => facet.fieldId)}
        />
      </div>
      <div className="text-center mt-6">
        <button
          className="Link Link--primary disabled:text-brand-gray-400"
          onClick={handleClearAllFacets}
          disabled={facets?.filter(facet => facet.options.filter(f => f.selected).length).length ? false : true}
        >
          Clear All
        </button>
      </div>
    </div>
  );
}

export default FacetsModal;
