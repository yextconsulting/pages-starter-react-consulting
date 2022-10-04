import { useEffect, useState } from 'react';
import type { Coordinate } from "@yext/types";
import DirectoryCard from 'src/components/cards/DirectoryCard';
import { useBreakpoint } from 'src/common/useBreakpoints';
import { Link } from '@yext/pages/components';
import { getPath as searchPath } from 'src/templates/search';
import { projectConfig } from 'src/config';

const defaultFields: string[] = [
  'c_nearbySection.title',
  'c_nearbySection.cTATitle',
  'c_nearbySection.cTALink',
  'c_nearbySection.linkToLocator',
];

interface NearbyProps {
  title?: string;
  linkToLocator?: boolean;
  buttonText?: string;
  buttonLink?: string;
  geocodedCoordinate: Coordinate;
  id: string;
  relativePrefixToRoot: string;
}

const Nearby = (props: NearbyProps) => {
  const {
    title = "Nearby Locations",
    linkToLocator = true,
    buttonText = "Find a Location",
    buttonLink,
    geocodedCoordinate,
    id,
    relativePrefixToRoot,
  } = props;

  // TODO(jhood): update type to match liveapi response
  const [nearbyLocations, setNearbyLocations] = useState<any[]>([]);
  const isDesktopBreakpoint = useBreakpoint("sm");

  useEffect(() => {
    const searchParams = new URLSearchParams({
      ...projectConfig.nearby.params,
      location: `${geocodedCoordinate.latitude},${geocodedCoordinate.longitude}`,
      filter: JSON.stringify({ "meta.id": { "!$eq": `${id}` } }),
    });

    fetch(`${projectConfig.nearby.endpoint}?${searchParams.toString()}`)
      .then(resp => resp.json())
      .then(data => setNearbyLocations(data.response.entities || []))
      .catch(error => console.error(error));
  }, []);
  
  const renderLocatorLink = () => {
    return linkToLocator ? (
      <Link href={buttonLink ?? relativePrefixToRoot + searchPath()} className="Link Button Button--primary hover:underline mt-8 sm:mt-0">
        {buttonText}
      </Link>
    ) : null;
  };

  return (
    <div className='py-8 sm:py-16'>
      <div className='container'>
        <div className='flex justify-between items-center mb-8'>
          <h2 className="text-4xl">
            {title}
          </h2>
          {isDesktopBreakpoint && renderLocatorLink()}
        </div>
        {nearbyLocations.length > 0 && (
          <ul className='flex flex-wrap -m-4'>
            {nearbyLocations.map(location => (
              // TODO(jhood): make standard Teaser card
              <li key={location.meta.id} className='p-4 w-full sm:w-1/2 lg:w-1/4'>
                <DirectoryCard relativePrefixToRoot={relativePrefixToRoot} content={location} />
              </li>
            ))}
          </ul>
        )}
        {!isDesktopBreakpoint && renderLocatorLink()}
      </div>
    </div>
  );
}

export {
  Nearby,
  defaultFields,
};
