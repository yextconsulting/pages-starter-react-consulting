import { useEffect, useState } from 'react';
import type { Coordinate } from "@yext/types";
import { DirectoryCard } from 'src/components/cards/DirectoryCard';
import { useBreakpoint } from 'src/common/useBreakpoints';
import { Link } from '@yext/pages/components';
import { getPath as searchPath } from 'src/templates/search';
import { projectConfig } from 'src/config';

const defaultFields: string[] = [
  'c_nearbySection',
];

type NearbyProps = {
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
      // TODO: using searchPath() has some drawbacks see here: https://github.com/yextconsulting/site-starter-react-consulting/pull/82#discussion_r987318173
      <Link href={buttonLink ?? relativePrefixToRoot + searchPath()} className="Button Button--primary mt-8 sm:mt-0">
        {buttonText}
      </Link>
    ) : null;
  };

  if (!nearbyLocations.length) {
    return null;
  }

  return (
    <div className='py-8 sm:py-16'>
      <div className='container'>
        <div className='flex justify-between items-center mb-8'>
          <h2 className="Heading Heading--head">
            {title}
          </h2>
          {isDesktopBreakpoint && renderLocatorLink()}
        </div>
          <ul className='flex flex-wrap -m-4'>
            {nearbyLocations.map(location => (
              // TODO(jhood): make standard Teaser card
              <li key={location.meta.id} className='p-4 w-full sm:w-1/2 lg:w-1/4'>
                <DirectoryCard relativePrefixToRoot={relativePrefixToRoot} profile={location} />
              </li>
            ))}
          </ul>
        {!isDesktopBreakpoint && renderLocatorLink()}
      </div>
    </div>
  );
}

export {
  Nearby,
  defaultFields,
};
