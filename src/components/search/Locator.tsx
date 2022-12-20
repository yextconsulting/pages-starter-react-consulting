import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { createCtx } from "src/common/createCtx";
import { useSearchActions, useSearchState } from "@yext/search-headless-react";
import { Map } from "@yext/pages/components";
import { GoogleMaps } from "@yext/components-tsx-maps";
import SearchBox from "src/components/search/SearchBox"
import LocatorCard from "src/components/cards/LocatorCard";
import ResultSummary from "src/components/search/ResultSummary";
import ResultList from "src/components/search/ResultList";
import CustomMarker from "src/components/search/CustomMarker";
import LoadingSpinner from "src/components/common/LoadingSpinner";
import mapStyles from "./defaultMapStyles.json";
import { useBreakpoint } from "src/common/useBreakpoints";
import { useLoadInitialSearchParams, useUpdateFacetParams } from "src/components/search/utils/handleSearchParams";
import { useGetSearchResults } from "src/components/search/utils/useGetSearchResults";
import "src/components/search/Locator.css";

export type LocatorContextType = {
  selectedId: string,
  setSelectedId: (id: string) => void,
  focusedId: string,
  setFocusedId: (id: string) => void,
  hoveredId: string,
  setHoveredId: (id: string) => void,
}

// Setup LocatorProvider to pass the [selected, hovered, focused]Ids between Marker interactions and LocatorCard interactions
export const [useLocatorContext, LocatorProvider] = createCtx<LocatorContextType>();

type LocatorProps = {
  // Will display results up to the verticalLimit (default 20, change with searchActions.setVerticalLimit(num))
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

  const searchActions = useSearchActions();
  const isLoading = useSearchState(state => state.searchStatus.isLoading);
  const isDesktopBreakpoint = useBreakpoint("sm");
  const [searchParams, setSearchParams] = useSearchParams();
  const [initialParamsLoaded, setInitialParamsLoaded] = useState(false);

  const initialParamsLoadedCallback = useCallback(() => setInitialParamsLoaded(true), [setInitialParamsLoaded]);

  // Load static and facet filters on page load.
  useLoadInitialSearchParams(searchActions, searchParams, setSearchParams, initialParamsLoadedCallback);
  // Update the facet url params whenever the search state facets object updates.
  useUpdateFacetParams(searchActions, searchParams, setSearchParams);

  // Unset any selected, hovered, or focused markers on new search
  useEffect(() => {
    setSelectedEntityId("");
    setFocusedEntityId("");
    setHoveredEntityId("");
  }, [searchActions.state.query.queryId]);

  const results = useGetSearchResults(displayAllOnNoResults);

  return (
    <LocatorProvider value={{
      selectedId: selectedEntityId,
      setSelectedId: setSelectedEntityId,
      focusedId: focusedEntityId,
      setFocusedId: setFocusedEntityId,
      hoveredId: hoveredEntityId,
      setHoveredId: setHoveredEntityId,
    }}>
      <div className="Locator">
        {(!initialParamsLoaded || isLoading) && <LoadingSpinner />}
        <div className="Locator-content">
          <SearchBox
            title={ title }
            subTitle={ subTitle }
            placeholderText={ placeholderText }
            searchParams={ searchParams }
            setSearchParams={ setSearchParams }
          />
          <div className="Locator-resultsWrapper">
            <ResultSummary />
            <ResultList CardComponent={ LocatorCard } displayAllOnNoResults={ displayAllOnNoResults } />
          </div>
        </div>
        {isDesktopBreakpoint && (
          <div className="Locator-map">
            <Map
              provider={ GoogleMaps }
              providerOptions={ {styles: mapStyles} }
              clientKey="gme-yextinc"
              bounds={ results.map(data => data.coordinate) }
              padding={ {top: 100, bottom: 200, left: 50, right: 50} }
              className="h-full"
            >
              {results.map((data, index) => (
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
  );
}
