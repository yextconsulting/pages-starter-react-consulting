import React from "react";
import { LocationMap } from "@yext/sites-react-components";
import { Coordinate } from "@yext/pages/components";
import useIfVisible from "src/components/util/LazyLoad";

interface LocationMapWrapperProps {
  mapRef: React.RefObject<HTMLElement>;
  children: React.ReactChild;
  provider: any;
  clientKey: string;
  coordinate: Coordinate;
};

const LocationMapWrapper = ({mapRef, ...props}: LocationMapWrapperProps) => {
  const isVisible = useIfVisible(mapRef);
  if (!isVisible) return <></>;
  return (
    <LocationMap {...props} />
  );
};

export default LocationMapWrapper;
