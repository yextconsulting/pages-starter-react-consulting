import { useEffect, useState } from "react";
import type { Coordinate } from "@yext/types";
import { FALLBACK_SEARCH_PATH } from "src/config";
import { Link } from "@yext/pages-components";
import { useTemplateData } from "src/common/useTemplateData";
import type { LiveAPIProfile, LocationProfile } from "src/types/entities";
import classNames from "classnames";
import DirectoryCard from "src/components/cards/DirectoryCard";
import ErrorBoundaryWithAnalytics from "../common/ErrorBoundaryWithAnalytics";

// Configure nearby locations section liveapi params and endpoint
// For all available params see: https://hitchhikers.yext.com/docs/contentdeliveryapis/legacy/entities#operation/geoSearchEntities

const getConfig = (api_key: string) => {
  return {
    endpoint: "https://liveapi.yext.com/v2/accounts/me/entities/geosearch",
    params: {
      api_key,
      entityTypes: "location",
      limit: "4",
      radius: "50",
      savedFilterIds: "<REPLACE-ME>",
      v: "20220927",
    },
  };
};

const Nearby = () => {
  const templateData = useTemplateData();
  const profile = templateData.document as LocationProfile;
  const nearby = profile.c_nearbySection;

  // TODO: move API fetching to this template

  return (
    <ErrorBoundaryWithAnalytics name="neaby">
      <NearbyLayout
        title={nearby?.title}
        linkToLocator={nearby?.linkToLocator}
        buttonText={nearby?.cta?.label}
        buttonLink={nearby?.cta?.link}
        coordinate={profile.yextDisplayCoordinate}
        id={profile.id}
      />
    </ErrorBoundaryWithAnalytics>
  );
};

type NearbyLayoutProps = {
  title?: string;
  linkToLocator?: boolean;
  buttonText?: string;
  buttonLink?: string;
  coordinate: Coordinate;
  id: string;
};

const NearbyLayout = (props: NearbyLayoutProps) => {
  const {
    title = "Nearby Locations",
    linkToLocator = true,
    buttonText = "Find a Location",
    buttonLink,
    coordinate,
    id,
  } = props;

  const { document, relativePrefixToRoot } = useTemplateData();
  const search_path =
    document?._site?.c_searchPage?.slug || FALLBACK_SEARCH_PATH;
  const apiKey = YEXT_PUBLIC_NEARBY_SECTION_API_KEY;

  const [nearbyLocations, setNearbyLocations] = useState<
    LiveAPIProfile<LocationProfile>[]
  >([]);

  useEffect(() => {
    if (!coordinate || !apiKey) {
      return;
    }

    const config = getConfig(apiKey);
    const searchParams = new URLSearchParams({
      ...config.params,
      location: `${coordinate.latitude},${coordinate.longitude}`,
      filter: JSON.stringify({ "meta.id": { "!$eq": `${id}` } }),
    });

    fetch(`${config.endpoint}?${searchParams.toString()}`)
      .then((resp) => resp.json())
      .then((data) => setNearbyLocations(data.response.entities || []))
      .catch((error) => console.error(error));
  }, [coordinate, id, apiKey]);

  const renderLocatorLink = (cls?: string) => {
    return linkToLocator ? (
      <Link
        href={buttonLink ?? relativePrefixToRoot + search_path}
        className={classNames("Button Button--primary mt-8 sm:mt-0", cls)}
      >
        {buttonText}
      </Link>
    ) : null;
  };

  if (!apiKey) {
    console.error(
      "Add a nearby API key to the .env file or as a site variable to enable the nearby locations component."
    );
  }

  return (
    <div className="py-8 sm:py-16">
      <div className="container">
        <div className="flex justify-between items-center mb-8">
          <h2 className="Heading Heading--head">{title}</h2>
          {renderLocatorLink("hidden sm:flex")}
        </div>
        <ul className="flex flex-wrap -m-4">
          {nearbyLocations.map((location) => (
            <li key={location.meta.id} className="p-4 w-full sm:w-1/2 lg:w-1/4">
              <DirectoryCard profile={location} />
            </li>
          ))}
        </ul>
        {renderLocatorLink("sm:hidden")}
      </div>
    </div>
  );
};

export default Nearby;
