import { useEffect } from "react";
import type { Coordinate } from "@yext/types";
import { Coordinate as CoordinateClass } from "@yext/components-tsx-geo";
import { Marker, useMapContext } from "@yext/sites-components";
import { useLocator } from "src/components/search/utils/useLocator";

type CustomMarkerProps = {
  coordinate: Coordinate;
  id: string;
  index: number;
};

const CustomMarker = (props: CustomMarkerProps) => {
  const {
    selectedId,
    setSelectedId,
    hoveredId,
    setHoveredId,
    focusedId,
    setFocusedId,
  } = useLocator();

  const { coordinate, id, index } = props;
  const selected = id === selectedId;
  const focused = id === focusedId;
  const hovered = id === hoveredId;
  const map = useMapContext();

  // If a marker is offscreen when its corresponding LocatorCard is clicked, pan the map to be centered on the marker
  useEffect(() => {
    if (selectedId === id) {
      if (!map.getBounds().contains(new CoordinateClass(coordinate))) {
        map.setCenter(coordinate, true);
      }
    }
  }, [selectedId, id, coordinate, map]);

  return (
    <Marker
      coordinate={coordinate}
      id={id}
      onClick={setSelectedId}
      onFocus={(focused, id) => setFocusedId(focused ? id : "")}
      onHover={(hovered, id) => setHoveredId(hovered ? id : "")}
      zIndex={selected ? 1 : hovered || focused ? 2 : 0}
    >
      <MapPin
        backgroundColor={
          selected ? "#0C5ECB" : hovered || focused ? "#0C5ECB" : "#0f70f0"
        }
        index={index}
        height={selected ? 57 : 49}
        width={selected ? 33 : 29}
      />
    </Marker>
  );
};

type MapPinProps = {
  backgroundColor?: string;
  height: number;
  index: number;
  textColor?: string;
  width: number;
};

const MapPin = (props: MapPinProps) => {
  const { backgroundColor, height, index, textColor, width } = props;
  return (
    <svg
      fill="none"
      height={height}
      viewBox="0 0 29 49"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m14.5.5c4 0 7.5028 1.49535 10.0037 3.99628 2.501 2.50093 3.9963 6.00372 3.9963 10.00372 0 4.3786-2.3969 7.7986-5.1195 11.7503-3.7142 5.391-8.0637 11.7263-8.3618 22.4575-1.3355-10.7312-5.68504-17.0665-9.39921-22.4575-2.72261-3.9517-5.11949-7.3717-5.11949-11.7503 0-4 1.49535-7.50279 3.99628-10.00372s6.00372-3.99628 10.00372-3.99628z"
        fill={backgroundColor ? backgroundColor : "#0f70f0"}
        stroke="#000"
        strokeOpacity=".5"
      />
      <text
        x="50%"
        y="40%"
        fontSize="14px"
        fontWeight="bold"
        dominantBaseline="middle"
        textAnchor="middle"
        fill={textColor ? textColor : "#FFFFFF"}
      >
        {index}
      </text>
    </svg>
  );
};

export default CustomMarker;
