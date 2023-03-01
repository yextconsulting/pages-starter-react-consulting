import { useEffect, useState } from "react";
import type { Coordinate } from "@yext/types";
import { DirectoryCard } from "src/components/cards/DirectoryCard";
import { useBreakpoint } from "src/common/useBreakpoints";
import { Link } from "@yext/pages/components";
import { SEARCH_PATH } from "src/config";
import { useTemplateData } from "src/common/useTemplateData";
import type { LiveAPIProfile, LocationProfile } from "src/types/entities";

// Configure nearby locations section liveapi params and endpoint
// See https://hitchhikers.yext.com/docs/liveapis/knowledgegraphliveapi/entities/entities/#operation/geoSearchEntities
type NearbyAPIConfig = {
  endpoint:
    | "https://liveapi-sandbox.yext.com/v2/accounts/me/entities/geosearch"
    | "https://liveapi.yext.com/v2/accounts/me/entities/geosearch";
  params: {
    api_key: string;
    entityTypes?: string;
    limit?: string;
    radius?: string;
    savedFilterIds?: string;
    v: string;
  };
};

const getConfig = (api_key: string): NearbyAPIConfig => {
  return {
    endpoint: "https://liveapi.yext.com/v2/accounts/me/entities/geosearch",
    params: {
      api_key,
      entityTypes: "location",
      limit: "4",
      radius: "50",
      savedFilterIds: "1246936843",
      v: "20220927",
    },
  };
};

const defaultFields: string[] = ["c_nearbySection"];

type NearbyProps = {
  title?: string;
  linkToLocator?: boolean;
  buttonText?: string;
  buttonLink?: string;
  geocodedCoordinate: Coordinate;
  id: string;
};

const Nearby = (props: NearbyProps) => {
  const {
    title = "Nearby Locations",
    linkToLocator = true,
    buttonText = "Find a Location",
    buttonLink,
    geocodedCoordinate,
    id,
  } = props;

  const { document, relativePrefixToRoot } = useTemplateData();
  const apiKey = document._site.c_nearbySectionAPIKey;

  const [nearbyLocations, setNearbyLocations] = useState<
    LiveAPIProfile<LocationProfile>[]
  >([]);
  const isDesktopBreakpoint = useBreakpoint("sm");

  useEffect(() => {
    if (!geocodedCoordinate || !apiKey) {
      return;
    }

    const config = getConfig(apiKey);
    const searchParams = new URLSearchParams({
      ...config.params,
      location: `${geocodedCoordinate.latitude},${geocodedCoordinate.longitude}`,
      filter: JSON.stringify({ "meta.id": { "!$eq": `${id}` } }),
    });

    fetch(`${config.endpoint}?${searchParams.toString()}`)
      .then((resp) => resp.json())
      .then((data) => setNearbyLocations(data.response.entities || []))
      .catch((error) => console.error(error));
  }, [geocodedCoordinate, id, apiKey]);

  const renderLocatorLink = () => {
    return linkToLocator ? (
      <Link
        href={buttonLink ?? relativePrefixToRoot + SEARCH_PATH}
        className="Button Button--primary mt-8 sm:mt-0"
      >
        {buttonText}
      </Link>
    ) : null;
  };

  if (!nearbyLocations.length) {
    return null;
  }

  return (
    <div className="py-8 sm:py-16">
      <div className="container">
        <div className="flex justify-between items-center mb-8">
          <h2 className="Heading Heading--head">{title}</h2>
          {isDesktopBreakpoint && renderLocatorLink()}
        </div>
        <ul className="flex flex-wrap -m-4">
          {nearbyLocations.map((location) => (
            <li key={location.meta.id} className="p-4 w-full sm:w-1/2 lg:w-1/4">
              <DirectoryCard profile={location} />
            </li>
          ))}
        </ul>
        {!isDesktopBreakpoint && renderLocatorLink()}
      </div>
    </div>
  );
};

export { Nearby, defaultFields };
