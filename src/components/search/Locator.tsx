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
  // To load any initial facets set with URLParams we need to run an initial search with just the builtin.location static filter to retrive the facet schema.
  const [initialParamsLoaded, setInitialParamsLoaded] = useState(false);
  const isDesktopBreakpoint = useBreakpoint("sm");
  const searchActions = useSearchActions();
  const [searchParams, setSearchParams] = useSearchParams();
  const staticFilters = useSearchState(s => s.filters.static);
  const facetFilters = useSearchState(s => s.filters.facets);

  /**
   * TODO: FilterSearch doesn't account for builtin.location being set already so when this is active it creates
   * two separate builtin.location filters that OR together surfacing more results than expected.
   * Looks like decorated actions are in the works, which can potentially be used passed to the filtersearch component
   * to unselect any current "builtin.locations" filters that are set
   * 
   * Need to unselect existing builtin.location once another search is made
   * https://yext.slack.com/archives/C032CKFARGS/p1656075200100409
   */

  // Load location filter and facets on page load
  useEffect(() => {
    // Load builtin.location
    const loadUrlParams = async () => {
      const entries = searchParams.entries();
      const locationFilterValue = searchParams.get('q');
      const locationFilterDisplayNane = searchParams.get('qp');
      if (locationFilterValue) {
        searchActions.setStaticFilters([{
          displayName: locationFilterDisplayNane ?? '',
          value: locationFilterValue,
          matcher: Matcher.Equals,
          fieldId: 'builtin.location',
          selected: true,
        }]);
        // Run search with just builtin.location to load available facets in state.filters.facets
        await searchActions.executeVerticalQuery();

        // Load facets TODO: check if facet key and option are valud before setting
        // Don't run another search if no facets
        // and then just setInitialParamsLoaded to true right away 
        for(const [key, values] of entries) {
          if (key !== 'q' && key !== 'qp') {
            const valueOptions = values.split(',');
            valueOptions.forEach(option => {
              searchActions.setFacetOption(key, { matcher: Matcher.Equals, value: option }, true);
            });
          }
        }
        await searchActions.executeVerticalQuery();
      }
      setInitialParamsLoaded(true);
    }
    loadUrlParams();
  }, []);

  // Update URLParams on new search
  // TODO: look into using a different package than React Router since we don't need to do any routing
  // TODO: Unselect builtin.location filter from URLParams if already set
  //  - how do I know which one should be the active filter????s
  // setInitialState would fix this
  // https://github.com/sindresorhus/query-string#api
  // https://www.npmjs.com/package/use-query-params#usequeryparams-1
  // TODO: This also doesn't work with geolocation at the moment since that uses {lat, long} instead of a Mapbox place id as the filter value
  useEffect(() => {
    if (!initialParamsLoaded) return;
    if (staticFilters) {
      const selectedFilters = staticFilters.filter(f => f.selected);
      const locationFilter = selectedFilters.find(f => f.fieldId === 'builtin.location') ?? null;

      // Prevent setting URLParam from geolocation search
      // TODO: make sure this works when adding the geolocation component currently being built by product
      if (locationFilter?.value && typeof(locationFilter.value) === "string") {
        let searchParamsObject: {[key: string]: string} = {};
        searchParamsObject["q"] = locationFilter?.value

        if (locationFilter.displayName) {
          searchParamsObject["qp"] = locationFilter.displayName;
        }

        if (facetFilters) {
          const activeFacets = facetFilters.filter((facet) => {
            return facet.options.filter(f => f.selected).length;
          });

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
          <div className="Locator-resultsWrapper">
            {initialParamsLoaded && (
              <>
                <ResultSummary />
                <ResultList CardComponent={ LocatorCard } displayAllOnNoResults={ displayAllOnNoResults } />
              </>
            )}
          </div>
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
