import { CardProps } from "@yext/search-ui-react";
import { Link, HoursStatus, StatusParams } from "@yext/sites-react-components";
import type { Address, Hours } from "@yext/types";
import 'src/components/cards/LocatorCard.css';

export interface LocatorCardProps {
  useKilometers?: boolean;
}

export default function LocatorCard(props: LocatorCardProps & CardProps) {
  const { result, useKilometers = false } = props;
  const { distanceFromFilter, link, rawData: profile } = result;
  const address = profile.address as Address;
  const hours = profile.hours as Hours;
  const geomodifier = address.line1 ? address.line1 : address.city;

  const renderTitle = () => <h3 className="LocatorCard-title Heading Heading--sub">{ geomodifier }</h3>;

  // TODO: convert to use useBreakpoint for conditional rendering instead of modifier
  const renderDistance = (modifier?: string) => distanceFromFilter ? <div className={`LocatorCard-distance${modifier ? " LocatorCard-distance--" + modifier : ""}`}>{getDistance(distanceFromFilter, useKilometers)} {useKilometers ? 'km' : 'mi'}</div> : null;

  return (
    <div className="LocatorCard">
      <div className="LocatorCard-topRow">
        {link ? (
          <Link href={ link } className="LocatorCard-visitpage Link--underlineInverse text-brand-primary">
            { renderTitle() }
          </Link>
        ) : renderTitle()}
        { renderDistance("desktop") }
      </div>
      <div className="LocatorCard-hours">
        <HoursStatus
          currentTemplate={ (params: StatusParams) => <span className="HoursStatus-current--search">{ params.isOpen ? 'Open Now' : 'Closed' }</span> }
          dayOfWeekTemplate={ () => null }
          hours={ hours }
          separatorTemplate={ () => <span className="bullet" /> }
        />
      </div>
      <div className="LocatorCard-address">{address.line1}</div>
      { renderDistance("mobile") }
    </div>
  )
}

// convert meters to miles or kilometers
function getDistance(distance: number, useKilometers: boolean) {
  if (useKilometers) {
    return (distance / 1000).toFixed(2);
  }
  return (distance / 1609.344).toFixed(2);
}
