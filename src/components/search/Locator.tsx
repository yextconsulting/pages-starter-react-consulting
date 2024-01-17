import { useCallback, useEffect, useState } from "react";
import { useSearchActions, useSearchState } from "@yext/search-headless-react";
import {
  Map,
  GoogleMaps,
  Clusterer,
  ClusterTemplateProps,
} from "@yext/pages-components";
import { useBreakpoint } from "src/common/useBreakpoints";
import {
  useLoadInitialSearchParams,
  useSyncSearchParamsWithState,
  useSyncStateWithSearchParams,
} from "src/components/search/utils/handleSearchParams";
import { useGetSearchResults } from "src/components/search/utils/useGetSearchResults";
import { LocatorProvider } from "./utils/useLocator";
import { LocationProfile } from "src/types/entities";
import "src/components/search/Locator.css";
import mapStyles from "src/components/search/defaultMapStyles.json";
import SearchBox from "src/components/search/SearchBox";
import LocatorCard from "src/components/cards/LocatorCard";
import ResultInfo from "src/components/search/ResultInfo";
import ResultList from "src/components/search/ResultList";
import CustomMarker from "src/components/search/CustomMarker";
import LoadingSpinner from "src/components/common/LoadingSpinner";
import { getMapKey } from "src/common/getMapKey";

type LocatorProps = {
  // Will display results up to the verticalLimit (default 20, change with searchActions.setVerticalLimit(num))
  displayAllOnNoResults?: boolean;
  placeholderText?: string;
  subTitle: string;
  title: string;
  allResultsOnLoad?: boolean;
};

const Locator = (props: LocatorProps) => {
  const {
    displayAllOnNoResults = false,
    allResultsOnLoad = false,
    placeholderText,
    subTitle,
    title,
  } = props;
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
    [setInitialParamsLoaded]
  );

  // Load static and facet filters on page load.
  useLoadInitialSearchParams(initialParamsLoaded, initialParamsLoadedCallback);
  // Update the search params whenever the search state filters property changes.
  useSyncSearchParamsWithState(initialParamsLoaded);
  // Update the state only on history change.
  useSyncStateWithSearchParams();

  // Unset any selected, hovered, or focused markers on new search
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
              bounds={results.map((data) => data.rawData.yextDisplayCoordinate)}
              padding={{ top: 100, bottom: 200, left: 50, right: 50 }}
              className="h-full"
              {...mapKey}
            >
              <Clusterer ClusterTemplate={ClusterTemplate}>
                {results.map((data, index) => (
                  <CustomMarker
                    key={data.rawData.id}
                    coordinate={data.rawData.yextDisplayCoordinate}
                    id={data.rawData.id}
                    index={index + 1}
                  />
                ))}
              </Clusterer>
            </Map>
          </div>
        )}
      </div>
    </LocatorProvider>
  );
};

export default Locator;

const ClusterTemplate = (props: ClusterTemplateProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 40 40"
    >
      <g fill="none" fillRule="evenodd">
        <circle
          fill="#0f70f0"
          fillRule="nonzero"
          stroke="white"
          cx="20"
          cy="20"
          r="20"
        />
        <text
          fill="white"
          fontFamily="Arial-BoldMT,Arial"
          fontSize="16"
          fontWeight="bold"
        >
          <tspan x="50%" y="25" textAnchor="middle">
            {props.count}
          </tspan>
        </text>
      </g>
    </svg>
  );
};
