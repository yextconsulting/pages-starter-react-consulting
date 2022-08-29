import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { createCtx } from "src/types/data";
import { useSearchState } from "@yext/search-headless-react";
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
  const isDesktopBreakpoint = useBreakpoint("sm");

  const [searchParams, setSearchParams] = useSearchParams();

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
        {isLoading && <LoadingSpinner />}
        <div className="Locator-content">
          <SearchBox
            title={ title }
            subTitle={ subTitle }
            placeholderText={ placeholderText }
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
              padding={ {top: 100, bottom: 50, left: 50, right: 50} }
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
  )
}
