import { useState } from 'react';
import { useSearchActions, Matcher } from '@yext/search-headless-react';
import { executeSearch, getUserLocation } from '@yext/search-ui-react';
import LoadingSpinner from 'src/components/common/LoadingSpinner';
import { GEOLOCATE_RADIUS, LOCATOR_STATIC_FILTER_FIELD } from 'src/config';
import type { URLSearchParamsInit } from "react-router-dom";

interface GeolocateButtonProps {
  className?: string;
  searchParams: URLSearchParams;
  setSearchParams: (nextInit: URLSearchParamsInit, navigateOptions?: { // TODO: could this be moved to a separate type file
    replace?: boolean | undefined;
    state?: any;
  } | undefined) => void;
}

export default function GeolocateButton(props: GeolocateButtonProps) {
  const {
    searchParams,
    setSearchParams,
    className,
  } = props;

  const searchActions = useSearchActions();
  const [isFetchingLocation, setIsFetchingLocation] = useState<boolean>(false);

  async function handleGeolocationClick() {
    setIsFetchingLocation(true);
    try {
      const position = await getUserLocation();

      // Set userlocation bias
      searchActions.setUserLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });

      // Set static filter to radius around users position
      searchActions.setStaticFilters([{
        displayName: "My Location",
        selected: true,
        filter: {
          kind: 'fieldValue',
          fieldId: LOCATOR_STATIC_FILTER_FIELD,
          matcher: Matcher.Near,
          value: { lat: position.coords.latitude, lng: position.coords.longitude, radius: 1609 * GEOLOCATE_RADIUS },
        }
      }]);

      searchActions.setOffset(0);
      searchActions.resetFacets();
      await executeSearch(searchActions);

      // Update URLSearchParams
      // TODO: this can be improved to be q={lat,lng}, r=radius
      // TODO: add filters_config to parse these params
      // TODO: add searchParams to context?
      searchParams.set('q', JSON.stringify({ lat: position.coords.latitude, lng: position.coords.longitude, radius: 1609 * GEOLOCATE_RADIUS }));
      searchParams.set('qp', "My Location");
      if (LOCATOR_STATIC_FILTER_FIELD === "builtin.location") {
        searchParams.set('filter_type', "location");
      }

      setSearchParams(searchParams);
    } catch (e) {
      alert("User location could not be determined.");
      console.error(e);
    } finally {
      setIsFetchingLocation(false);
    }
  }

  return (
    <>
      <button className={ className } onClick={ handleGeolocationClick }>
        <svg fill="none" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
          <path d="m14.4347 0c-.1791 0-.3622.034375-.5435.11l-12.99279 5.99656c-1.499063.69969-.999375 2.89844.59969 2.89844h5.49718v5.4972c0 .9378.75657 1.4978 1.52313 1.4978.54062 0 1.08594-.2781 1.37531-.8981l5.99688-12.99315c.4241-1.01844-.4484-2.10875-1.4559-2.10875zm.5484 1.69-5.99532 12.9894c-.09937.2131-.2575.3212-.46968.3212-.18125 0-.52375-.104-.52375-.4981v-6.49688h-6.49625c-.35782 0-.4575-.27593-.48407-.39468-.03437-.15406-.039683-.43688.30313-.59688l12.95874-5.98156c.0534-.02219.1053-.032813.1591-.032813.1693 0 .359.114063.4722.283753.0684.10281.135.26281.0759.40656z" fill="#0f70f0"/>
        </svg>
        <span className="sr-only">Geolocate.</span>
      </button>
      { isFetchingLocation && <LoadingSpinner /> }
    </>
  )
}
