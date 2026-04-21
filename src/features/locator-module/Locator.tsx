import { useCallback, useEffect, useState } from "react";
import { useSearchActions, useSearchState } from "@yext/search-headless-react";
import { GoogleMaps, Map } from "@yext/pages-components";
import ErrorBoundaryWithAnalytics from "src/components/common/ErrorBoundaryWithAnalytics";
import LoadingSpinner from "src/components/common/LoadingSpinner";
import { useBreakpoint } from "src/common/useBreakpoints";
import { getMapKey } from "src/common/getMapKey";
import mapStyles from "src/components/search/defaultMapStyles.json";
import { LocationProfile } from "src/types/entities";
import CustomMarker from "./CustomMarker";
import {
  useLoadInitialSearchParams,
  useSyncSearchParamsWithState,
  useSyncStateWithSearchParams,
} from "./handleSearchParams";
import LocatorCard from "./LocatorCard";
import "./Locator.css";
import { useGetSearchResults } from "./useGetSearchResults";
import { LocatorProvider } from "./useLocator";
import ResultInfo from "./ResultInfo";
import ResultList from "./ResultList";
import SearchBox from "./SearchBox";

type LocatorProps = {
  allResultsOnLoad?: boolean;
  displayAllOnNoResults?: boolean;
  placeholderText?: string;
  subTitle: string;
  title: string;
};

const Locator = ({
  displayAllOnNoResults = false,
  allResultsOnLoad = false,
  placeholderText,
  subTitle,
  title,
}: LocatorProps) => {
  const mapKey = getMapKey();
  const [selectedEntityId, setSelectedEntityId] = useState("");
  const [focusedEntityId, setFocusedEntityId] = useState("");
  const [hoveredEntityId, setHoveredEntityId] = useState("");

  const searchActions = useSearchActions();
  const isLoading = useSearchState((state) => state.searchStatus.isLoading);
  const isDesktopBreakpoint = useBreakpoint("sm");
  const [allLocationsLoaded, setAllLocationsLoaded] = useState(false);
  const [initialParamsLoaded, setInitialParamsLoaded] = useState(false);
  const initialParamsLoadedCallback = useCallback(
    () => setInitialParamsLoaded(true),
    []
  );

  useLoadInitialSearchParams(initialParamsLoaded, initialParamsLoadedCallback);
  useSyncSearchParamsWithState(initialParamsLoaded);
  useSyncStateWithSearchParams();

  useEffect(() => {
    setSelectedEntityId("");
    setFocusedEntityId("");
    setHoveredEntityId("");
  }, [searchActions.state.query.queryId]);

  const results = useGetSearchResults<LocationProfile>(
    displayAllOnNoResults,
    allResultsOnLoad,
    () => {
      setAllLocationsLoaded(true);
    }
  );

  return (
    <LocatorProvider
      value={{
        results,
        selectedId: selectedEntityId,
        setSelectedId: setSelectedEntityId,
        focusedId: focusedEntityId,
        setFocusedId: setFocusedEntityId,
        hoveredId: hoveredEntityId,
        setHoveredId: setHoveredEntityId,
      }}
    >
      <div className="Locator">
        {(!initialParamsLoaded ||
          isLoading ||
          (allResultsOnLoad && !allLocationsLoaded)) && <LoadingSpinner />}
        <div className="Locator-content">
          <SearchBox
            placeholderText={placeholderText}
            subTitle={subTitle}
            title={title}
          />
          <ResultInfo />
          <ResultList CardComponent={LocatorCard} />
        </div>
        {isDesktopBreakpoint && (
          <div className="Locator-map">
            <ErrorBoundaryWithAnalytics name="map" noAnalyticsScope={true}>
              <Map
                bounds={results.map(
                  (data) => data.rawData.yextDisplayCoordinate
                )}
                className="h-full"
                padding={{ top: 100, bottom: 200, left: 50, right: 50 }}
                provider={GoogleMaps}
                providerOptions={{ styles: mapStyles }}
                {...mapKey}
              >
                {results.map((data, index) => (
                  <CustomMarker
                    coordinate={data.rawData.yextDisplayCoordinate}
                    id={data.rawData.id}
                    index={index + 1}
                    key={data.rawData.id}
                  />
                ))}
              </Map>
            </ErrorBoundaryWithAnalytics>
          </div>
        )}
      </div>
    </LocatorProvider>
  );
};

export default Locator;
