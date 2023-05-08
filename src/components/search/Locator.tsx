import { useCallback, useEffect, useState } from "react";
import { useSearchActions, useSearchState } from "@yext/search-headless-react";
import { Map, Clusterer, ClusterTemplateProps } from "./map";
import { GoogleMaps } from "@yext/components-tsx-maps";
import { useBreakpoint } from "src/common/useBreakpoints";
import {
  useHandleSearchParams,
  useLoadInitialSearchParams,
} from "src/components/search/utils/handleSearchParams";
import { useGetSearchResults } from "src/components/search/utils/useGetSearchResults";
import { LocatorProvider } from "./utils/useLocator";
import "src/components/search/Locator.css";
import mapStyles from "src/components/search/defaultMapStyles.json";
import SearchBox from "src/components/search/SearchBox";
import LocatorCard from "src/components/cards/LocatorCard";
import ResultInfo from "src/components/search/ResultInfo";
import ResultList from "src/components/search/ResultList";
import CustomMarker from "src/components/search/CustomMarker";
import LoadingSpinner from "src/components/common/LoadingSpinner";

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
              <Clusterer ClusterTemplate={ClusterPinTemplate}>
                {results.map((data, index) => (
                  <CustomMarker
                    key={data.id}
                    coordinate={data.coordinate}
                    id={data.id}
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

const ClusterPinTemplate = (props: ClusterTemplateProps) => {
  return (
    <div>
      <svg
        width="30"
        height="38"
        viewBox="0 0 30 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M30 15.0882C30 23.4212 23.3333 30.7353 15 38C7.22222 31.2941 0 23.4212 0 15.0882C0 6.75523 6.71573 0 15 0C23.2843 0 30 6.75523 30 15.0882Z"
          className="fill-brand-primary"
        />
        <text
          x="50%"
          y="40%"
          fontSize="14px"
          fontWeight="bold"
          dominantBaseline="middle"
          textAnchor="middle"
          className="fill-white"
        >
          {props.count}
        </text>
      </svg>
    </div>
  );
};
