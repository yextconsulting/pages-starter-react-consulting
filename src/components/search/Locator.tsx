import { useCallback, useEffect, useState } from "react";
import { useSearchActions, useSearchState } from "@yext/search-headless-react";
import { Map } from "@yext/pages/components";
import { GoogleMaps } from "@yext/components-tsx-maps";
import { useBreakpoint } from "../../common/useBreakpoints";
import {
  useHandleSearchParams,
  useLoadInitialSearchParams,
} from "../../components/search/utils/handleSearchParams";
import { useGetSearchResults } from "../../components/search/utils/useGetSearchResults";
import { LocatorProvider } from "./utils/useLocator";
import { LocationProfile } from "../../types/entities";
import "../../components/search/Locator.css";
import mapStyles from "../../components/search/defaultMapStyles.json";
import SearchBox from "../../components/search/SearchBox";
import LocatorCard from "../../components/cards/LocatorCard";
import ResultInfo from "../../components/search/ResultInfo";
import ResultList from "../../components/search/ResultList";
import CustomMarker from "../../components/search/CustomMarker";
import LoadingSpinner from "../../components/common/LoadingSpinner";

type LocatorProps = {
  // Will display results up to the verticalLimit (default 20, change with searchActions.setVerticalLimit(num))
  displayAllOnNoResults?: boolean;
  placeholderText?: string;
  subTitle: string;
  title: string;
};

const Locator = (props: LocatorProps) => {
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

  const results = useGetSearchResults<LocationProfile>(displayAllOnNoResults);

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
        {(!initialParamsLoaded || isLoading) && <LoadingSpinner />}
        <div className="Locator-content">
          <SearchBox
            title={title}
            subTitle={subTitle}
            placeholderText={placeholderText}
          />
          <ResultInfo />
          <ResultList CardComponent={LocatorCard} />
        </div>
        {isDesktopBreakpoint && (
          <div className="Locator-map">
            <Map
              provider={GoogleMaps}
              providerOptions={{ styles: mapStyles }}
              clientKey="gme-yextinc"
              bounds={results.map((data) => data.rawData.yextDisplayCoordinate)}
              padding={{ top: 100, bottom: 200, left: 50, right: 50 }}
              className="h-full"
            >
              {results.map((data, index) => (
                <CustomMarker
                  key={data.rawData.id}
                  coordinate={data.rawData.yextDisplayCoordinate}
                  id={data.rawData.id}
                  index={index + 1}
                />
              ))}
            </Map>
          </div>
        )}
      </div>
    </LocatorProvider>
  );
};

export default Locator;
