import { useCallback, useEffect, useState } from "react";
import { createCtx } from "src/common/createCtx";
import { useSearchActions, useSearchState } from "@yext/search-headless-react";
import { Map } from "@yext/pages/components";
import { GoogleMaps } from "@yext/components-tsx-maps";
import { useBreakpoint } from "src/common/useBreakpoints";
import {
  useHandleSearchParams,
  useLoadInitialSearchParams,
} from "src/components/search/utils/handleSearchParams";
import { useGetSearchResults } from "src/components/search/utils/useGetSearchResults";
import "src/components/search/Locator.css";
import mapStyles from "src/components/search/defaultMapStyles.json";
import SearchBox from "src/components/search/SearchBox";
import LocatorCard from "src/components/cards/LocatorCard";
import ResultInfo from "src/components/search/ResultInfo";
import ResultList from "src/components/search/ResultList";
import CustomMarker from "src/components/search/CustomMarker";
import LoadingSpinner from "src/components/common/LoadingSpinner";

export type LocatorContextType = {
  selectedId: string;
  setSelectedId: (id: string) => void;
  focusedId: string;
  setFocusedId: (id: string) => void;
  hoveredId: string;
  setHoveredId: (id: string) => void;
};

// Setup LocatorProvider to pass the [selected, hovered, focused]Ids between Marker interactions and LocatorCard interactions
export const [useLocator, LocatorProvider] = createCtx<LocatorContextType>(
  "Attempted to call useLocator outside of LocatorProvider"
);

type LocatorProps = {
  // Will display results up to the verticalLimit (default 20, change with searchActions.setVerticalLimit(num))
  displayAllOnNoResults?: boolean;
  placeholderText?: string;
  subTitle: string;
  title: string;
};

export default function Locator(props: LocatorProps) {
  const {
    displayAllOnNoResults = false,
    placeholderText,
    subTitle,
    title,
  } = props;
  const [selectedEntityId, setSelectedEntityId] = useState("");
  const [focusedEntityId, setFocusedEntityId] = useState("");
  const [hoveredEntityId, setHoveredEntityId] = useState("");

  const searchActions = useSearchActions();
  const isLoading = useSearchState((state) => state.searchStatus.isLoading);
  const isDesktopBreakpoint = useBreakpoint("sm");
  const [initialParamsLoaded, setInitialParamsLoaded] = useState(false);
  const initialParamsLoadedCallback = useCallback(
    () => setInitialParamsLoaded(true),
    [setInitialParamsLoaded]
  );

  // Load static and facet filters on page load.
  useLoadInitialSearchParams(initialParamsLoaded, initialParamsLoadedCallback);
  // Update the search params whenever the search state filters property changes.
  useHandleSearchParams(initialParamsLoaded);

  // Unset any selected, hovered, or focused markers on new search
  useEffect(() => {
    setSelectedEntityId("");
    setFocusedEntityId("");
    setHoveredEntityId("");
  }, [searchActions.state.query.queryId]);

  const results = useGetSearchResults(displayAllOnNoResults);

  return (
    <LocatorProvider
      value={{
        selectedId: selectedEntityId,
        setSelectedId: setSelectedEntityId,
        focusedId: focusedEntityId,
        setFocusedId: setFocusedEntityId,
        hoveredId: hoveredEntityId,
        setHoveredId: setHoveredEntityId,
      }}
    >
      <div className="Locator">
        {(!initialParamsLoaded || isLoading) && <LoadingSpinner />}
        <div className="Locator-content">
          <SearchBox
            title={title}
            subTitle={subTitle}
            placeholderText={placeholderText}
          />
          <ResultInfo />
          <ResultList
            CardComponent={LocatorCard}
            displayAllOnNoResults={displayAllOnNoResults}
          />
        </div>
        {isDesktopBreakpoint && (
          <div className="Locator-map">
            <Map
              provider={GoogleMaps}
              providerOptions={{ styles: mapStyles }}
              clientKey="gme-yextinc"
              bounds={results.map((data) => data.coordinate)}
              padding={{ top: 100, bottom: 200, left: 50, right: 50 }}
              className="h-full"
            >
              {results.map((data, index) => (
                <CustomMarker
                  key={data.id}
                  coordinate={data.coordinate}
                  id={data.id}
                  index={index + 1}
                  name={data.name}
                />
              ))}
            </Map>
          </div>
        )}
      </div>
    </LocatorProvider>
  );
}
