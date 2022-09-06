import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { createCtx } from "src/types/data";
import { useSearchActions, useSearchState, Matcher } from "@yext/search-headless-react";
import { Map } from "@yext/sites-react-components";
import { GoogleMaps } from "@yext/components-tsx-maps";
import type { Coordinate } from "@yext/types";
import SearchBox from "src/components/search/SearchBox"
import LocatorCard from "src/components/cards/LocatorCard";
import ResultSummary from "src/components/search/ResultSummary";
import ResultList from "src/components/search/ResultList";
import CustomMarker from "src/components/search/CustomMarker";
import LoadingSpinner from "src/components/common/LoadingSpinner";
import mapStyles from "./defaultMapStyles.json";
import { useBreakpoint } from "src/common/useBreakpoints";
import { loadInitialSearchParams } from "./utils/handleSearchParams";
import "src/components/search/Locator.css";

type LocatorSearchResultType = {
  coordinate: Coordinate,
  id: string,
}

export type LocatorContextType = {
  selectedId: string,
  setSelectedId: (id: string) => void,
  focusedId: string,
  setFocusedId: (id: string) => void,
  hoveredId: string,
  setHoveredId: (id: string) => void,
  initialParamsLoaded: boolean,
}

// Setup LocatorProvider to pass the [selected, hovered, focused]Ids between Marker interactions and LocatorCard interactions
export const [useLocatorContext, LocatorProvider] = createCtx<LocatorContextType>();

type LocatorProps = {
  displayAllOnNoResults?: boolean,
  placeholderText?: string,
  subTitle: string,
  title: string,
}

export default function Locator(props: LocatorProps) {
  const { displayAllOnNoResults = false, placeholderText, subTitle, title } = props;
  const [selectedEntityId, setSelectedEntityId] = useState("");
  const [focusedEntityId, setFocusedEntityId] = useState("");
  const [hoveredEntityId, setHoveredEntityId] = useState("");

  // Get search results from searchState and map to required fields for the Map and Marker components
  // If displayAllOnNoResults = true, the search will use the 20 locations closest to the users location by default
  const results = useSearchState((state) => {
    const searchResults = state.vertical.results || [];
    const allResults= useSearchState(state => state.vertical?.noResults?.allResultsForVertical.results) || [];
    const resultsToMap = (searchResults.length === 0 && displayAllOnNoResults) ? allResults : searchResults;
    const dataToRender = resultsToMap.map((result) => {
      return {
        coordinate: result.rawData.yextDisplayCoordinate,
        id: result.id,
      } as LocatorSearchResultType;
    });
    return dataToRender;
  });

  const isLoading = useSearchState(state => state.searchStatus.isLoading);
  const [initialParamsLoaded, setInitialParamsLoaded] = useState(false);
  const isDesktopBreakpoint = useBreakpoint("sm");
  const searchActions = useSearchActions();
  const [searchParams, setSearchParams] = useSearchParams();

  /**
   * TODO: FilterSearch doesn't account for builtin.location being set already so when there is a saved locationId in the URLSearchParams
   * two separate builtin.location filters are selected on the next FilterSearch and are combined to show results from both locations.
   * Looks like decorated actions are in the works, which can be used passed to the filtersearch component
   * to unselect any current "builtin.locations" filters that are selected.
   * Also the potential to set an initialFilterState would be useful here as well since otherwise the FilterSearch input won't be
   * populated.
   *
   * https://yext.slack.com/archives/C032CKFARGS/p1656075200100409
   */

  // Load location filter and facets on page load
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

  /**
   * TODO: Update to use decorated actions and the filtersearch geolocate features are added by product.
   * TODO: This also doesn't work with geolocation at the moment since that uses {lat, long} instead of a Mapbox place id as the filter value
   */

  // Update URLSearchParams on new search
  useEffect(() => {
    if (!initialParamsLoaded) return;

    const staticFilters = searchActions.state.filters.static;
    const facetFilters = searchActions.state.filters.facets;

    if (staticFilters) {
      // TODO: There are multiple filters that are valid here for the above reasons. Make sure this looks good after adding geolocate and decorated actions.
      const locationFilter = staticFilters.filter(f => f.selected).find(f => f.fieldId === 'builtin.location') ?? null;

      // Prevent setting URLParam from geolocation search for now
      if (locationFilter?.value && typeof(locationFilter.value) === "string") {
        let searchParamsObject: {[key: string]: string} = {};
        searchParamsObject["q"] = locationFilter.value
        if (locationFilter.displayName) {
          searchParamsObject["qp"] = locationFilter.displayName;
        }

        if (facetFilters) {
          const activeFacets = facetFilters.filter(facet => facet.options.filter(f => f.selected).length);
          activeFacets.forEach(facet => {
            const fieldId = facet.fieldId;
            const activeOptions = facet.options.filter(f => f.selected).map(f => f.value).join(',');
            searchParamsObject[fieldId] = activeOptions;
          });
        }

        setSearchParams(searchParamsObject);
      }
    }
  }, [searchActions.state.query.queryId]);

  // Unset any selected, hovered, or focused markers on search
  useEffect(() => {
    setSelectedEntityId("");
    setFocusedEntityId("");
    setHoveredEntityId("");
  }, [JSON.stringify(results)]);

  return (
    <LocatorProvider value={{
      selectedId: selectedEntityId,
      setSelectedId: setSelectedEntityId,
      focusedId: focusedEntityId,
      setFocusedId: setFocusedEntityId,
      hoveredId: hoveredEntityId,
      setHoveredId: setHoveredEntityId,
      initialParamsLoaded: initialParamsLoaded,
    }}>
      <div className="Locator">
        {isLoading && <LoadingSpinner />}
        <div className="Locator-content">
          <SearchBox
            title={ title }
            subTitle={ subTitle }
            placeholderText={ placeholderText }
          />
          {initialParamsLoaded && (
            <div className="Locator-resultsWrapper">
              <ResultSummary />
              <ResultList CardComponent={ LocatorCard } displayAllOnNoResults={ displayAllOnNoResults } />
            </div>
          )}
        </div>
        {isDesktopBreakpoint && (
          <div className="Locator-map">
            <Map
              provider={ GoogleMaps }
              providerOptions={ {styles: mapStyles} }
              clientKey="gme-yextinc"
              bounds={ results.map(data => data.coordinate) }
              padding={ {top: 100, bottom: 50, left: 50, right: 50} }
            >
              {initialParamsLoaded && results.map((data, index) => (
                <CustomMarker
                  key={ data.id }
                  coordinate={ data.coordinate }
                  id={ data.id }
                  index={ index + 1 }
                />
              ))}
            </Map>
          </div>
        )}
      </div>
    </LocatorProvider>
  )
}
