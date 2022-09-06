import { useEffect } from "react";
import { Matcher } from "@yext/search-headless-react";
import type { SearchHeadless } from "@yext/search-headless-react";

export function loadInitialSearchParams(
    searchActions: SearchHeadless,
    searchParams: URLSearchParams,
    setInitialParamsLoaded: React.Dispatch<React.SetStateAction<boolean>>
  ) {
  useEffect(() => {
    const loadUrlParams = async () => {
      const locationPlaceId = searchParams.get('q');
      const locationDisplayNane = searchParams.get('qp');
      if (locationPlaceId) {
        searchActions.setStaticFilters([{
          displayName: locationDisplayNane ?? '',
          value: locationPlaceId,
          matcher: Matcher.Equals,
          fieldId: 'builtin.location',
          selected: true,
        }]);
        // Run search with just builtin.location to load available facets in state.filters.facets
        await searchActions.executeVerticalQuery();

        const facetParams = Array.from(searchParams.entries()).filter(([fieldId, options]) => fieldId !== 'q' && fieldId !== 'qp');
        if (facetParams.length) {
          for (const [fieldId, options] of facetParams) {
            // Check if facet from params is available to set in the search state
            if (searchActions.state.filters.facets?.find(f => f.fieldId === fieldId)) {
              const optionsArray = options.split(',');
              optionsArray.forEach(option => {
                searchActions.setFacetOption(fieldId, { matcher: Matcher.Equals, value: option }, true);
              });
            }
          }
         await searchActions.executeVerticalQuery();
        }
      }
      setInitialParamsLoaded(true);
    }
    loadUrlParams();
  }, []);
}