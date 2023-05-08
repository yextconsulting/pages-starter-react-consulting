import {
  createContext,
  useContext,
  useEffect,
  useState,
  Fragment,
} from "react";
import { MapContext } from "./map";
import { Marker } from "./marker";
import type {
  MapContextType,
  ClustererProps,
  PinStoreType,
  ClusterContextType,
} from "./types";
import type { Map } from "@yext/components-tsx-maps";
import {
  Unit,
  Projection,
  Coordinate,
  GeoBounds,
} from "@yext/components-tsx-geo";

export const ClusterContext = createContext<ClusterContextType | null>(null);

export function useClusterContext() {
  const ctx = useContext(ClusterContext);

  if (!ctx) {
    throw new Error(
      "Attempted to call useClusterContext() outside of <Clusterer>."
    );
  }

  return ctx;
}

export const Clusterer = ({ children, ClusterTemplate }: ClustererProps) => {
  const { map } = useContext(MapContext) as MapContextType;
  const [pinStore, setPinStore] = useState<PinStoreType[]>([]);
  const [clusters, setClusters] = useState<PinStoreType[][]>();
  const [clustersToRender, setClustersToRender] = useState<JSX.Element[]>([]);

  console.log(pinStore);

  // Recalculate the clusters when either the pin store is updated or the map zoom level changes.
  useEffect(() => {
    setClusters(generateClusters(pinStore, map));
  }, [pinStore, map.getZoom()]);

  // When the clusters are updated, remove any pins in a cluster of more than 1 pin from the map.
  // Then calculate the geo bounds of all the pins in the cluster and render a single marker
  // at their center.
  useEffect(() => {
    if (clusters && clusters.length) {
      setClustersToRender(() => []);
      clusters.forEach((cluster) => {
        if (cluster.length === 0) {
          return;
        }
        if (cluster.length === 1) {
          // Single marker in cluster so just render normally.
          cluster[0].pin.setMap(map);
        } else {
          // Calculate center of all markers in the cluster.
          // Used to set the coordinate of the marker as well as generate a unique id.
          const clusterCenter: Coordinate = GeoBounds.fit(
            cluster.map((p) => p.pin.getCoordinate())
          ).getCenter(Projection.MERCATOR);

          // Remove all markers in cluster from the map and render one cluster marker instead at their geo center.
          cluster.forEach((p) => p.pin.setMap(null));
          setClustersToRender((clustersToRender) => [
            ...clustersToRender,
            <Marker
              coordinate={clusterCenter}
              id={`cluster-{${clusterCenter._lat},${clusterCenter._lon}}`}
              key={`cluster-{${clusterCenter._lat},${clusterCenter._lon}}`}
              onClick={() =>
                map.fitCoordinates(
                  cluster.map((p) => p.pin.getCoordinate()),
                  true,
                  Infinity
                )
              }
            >
              {ClusterTemplate ? (
                <ClusterTemplate count={cluster.length} />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                >
                  <g fill="none" fillRule="evenodd">
                    <circle
                      fill="red"
                      fillRule="nonzero"
                      stroke="white"
                      cx="11"
                      cy="11"
                      r="11"
                    />
                    <text
                      fill="white"
                      fontFamily="Arial-BoldMT,Arial"
                      fontSize="12"
                      fontWeight="bold"
                    >
                      <tspan x="50%" y="15" textAnchor="middle">
                        {cluster.length}
                      </tspan>
                    </text>
                  </g>
                </svg>
              )}
            </Marker>,
          ]);
        }
      });
    }
  }, [clusters]);

  return (
    <ClusterContext.Provider
      value={{
        pinStore,
        setPinStore,
        clusters: clusters ?? [],
      }}
    >
      <>
        {clustersToRender.map((cluster, idx) => (
          <Fragment key={idx}>{cluster}</Fragment>
        ))}
        {children}
      </>
    </ClusterContext.Provider>
  );
};

const CLUSTER_RADIUS = 50;

const generateClusters = (pins: PinStoreType[], map: Map) => {
  const clusterRadiusRadians =
    (CLUSTER_RADIUS * Math.PI) / 2 ** (map.getZoom() + 7);
  const pinsInRadius = pins.map((_, index) => [index]);
  const pinClusters = [];

  // Calculate the distances of each pin to each other pin
  pins.forEach((pin, index) => {
    for (let otherIndex = index; otherIndex < pins.length; otherIndex++) {
      if (otherIndex != index) {
        const distance = new Coordinate(pin.pin.getCoordinate()).distanceTo(
          new Coordinate(pins[otherIndex].pin.getCoordinate()),
          Unit.RADIAN,
          Projection.MERCATOR
        );

        if (distance <= clusterRadiusRadians) {
          pinsInRadius[index].push(otherIndex);
          pinsInRadius[otherIndex].push(index);
        }
      }
    }
  });

  // Loop until there are no pins left to cluster
  while (true) {
    let maxCount = 0;
    let chosenIndex;

    // Find the pin with the most other pins within radius
    pinsInRadius.forEach((pinGroup, index) => {
      if (pinGroup.length > maxCount) {
        maxCount = pinGroup.length;
        chosenIndex = index;
      }
    });

    // If there are no more pins within clustering radius of another pin, break
    if (!maxCount) {
      break;
    }

    // Add pins to a new cluster, and remove them from pinsInRadius
    const chosenPins = pinsInRadius[chosenIndex ?? 0];
    const cluster = [];

    pinsInRadius[chosenIndex ?? 0] = [];

    for (const index of chosenPins) {
      const pinGroup = pinsInRadius[index];

      // Add the pin to this cluster and remove it from consideration for other clusters
      cluster.push(pins[index]);
      pinsInRadius[index] = [];
      pinGroup.forEach((otherIndex) =>
        pinsInRadius[otherIndex].splice(
          pinsInRadius[otherIndex].indexOf(index),
          1
        )
      );
    }

    pinClusters.push(cluster);
  }

  return pinClusters;
};
