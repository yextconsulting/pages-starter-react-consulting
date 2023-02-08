import type { CardProps } from "@yext/search-ui-react";
import { HoursStatus } from "@yext/sites-react-components";
import type { StatusParams } from "@yext/sites-react-components";
import { Link } from "@yext/pages/components";
import type { Address, Hours } from "@yext/types";
import { useBreakpoint } from "src/common/useBreakpoints";

export interface LocatorCardProps {
  useKilometers?: boolean;
}

export default function LocatorCard(props: LocatorCardProps & CardProps) {
  const { result, useKilometers = false } = props;
  const { distanceFromFilter, link, rawData: profile } = result;
  const address = profile.address as Address;
  const hours = profile.hours as Hours;
  const geomodifier = address.line1 ? address.line1 : address.city;
  const isDesktopBreakpoint = useBreakpoint("sm");

  const renderTitle = () => (
    <h3 className="Heading Heading--sub pb-2 sm:pb-4">{geomodifier}</h3>
  );
  const renderDistance = () =>
    distanceFromFilter ? (
      <div className="LocatorCard-distance whitespace-nowrap pt-2 sm:pt-0">
        {getDistance(distanceFromFilter, useKilometers)}{" "}
        {useKilometers ? "km" : "mi"}
      </div>
    ) : null;

  return (
    <div className="LocatorCard">
      <div className="flex justify-between">
        {link ? (
          <Link
            href={link}
            className="LocatorCard-visitpage Link--underlineInverse text-brand-primary"
          >
            {renderTitle()}
          </Link>
        ) : (
          renderTitle()
        )}
        {isDesktopBreakpoint && renderDistance()}
      </div>
      {hours && (
        <div className="pb-2 sm:pb-4">
          <HoursStatus
            currentTemplate={(params: StatusParams) => (
              <span className="HoursStatus-current--search">
                {params.isOpen ? "Open Now" : "Closed"}
              </span>
            )}
            dayOfWeekTemplate={() => null}
            hours={hours}
            separatorTemplate={() => <span className="bullet" />}
          />
        </div>
      )}
      <div>{address.line1}</div>
      {!isDesktopBreakpoint && renderDistance()}
    </div>
  );
}

// convert meters to miles or kilometers
function getDistance(distance: number, useKilometers: boolean) {
  if (useKilometers) {
    return (distance / 1000).toFixed(2);
  }
  return (distance / 1609.344).toFixed(2);
}
