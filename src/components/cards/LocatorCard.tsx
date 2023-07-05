import type { CardProps } from "@yext/search-ui-react";
import { HoursStatus } from "@yext/sites-react-components";
import { Link } from "@yext/pages/components";
import classNames from "classnames";
import { LocationProfile } from "src/types/entities";
import { useTemplateData } from "src/common/useTemplateData";

export interface LocatorCardProps {
  useKilometers?: boolean;
}

const LocatorCard = (props: LocatorCardProps & CardProps<LocationProfile>) => {
  const { result, useKilometers = false } = props;
  const { distanceFromFilter, rawData } = result;
  const { address, hours, slug } = rawData;
  const { relativePrefixToRoot } = useTemplateData();

  const renderTitle = () => (
    <h3 className="Heading Heading--sub pb-2 sm:pb-4">
      {address.line1 ? address.line1 : address.city}
    </h3>
  );

  const renderDistance = (className?: string) =>
    distanceFromFilter ? (
      <div className={classNames("whitespace-nowrap pt-2 sm:pt-0", className)}>
        {`${getDistance(distanceFromFilter, useKilometers)} ${
          useKilometers ? "km" : "mi"
        }`}
      </div>
    ) : null;

  return (
    <div className="LocatorCard">
      <div className="flex justify-between">
        {slug ? (
          <Link
            href={relativePrefixToRoot + slug}
            className="Link--underlineInverse text-brand-primary"
          >
            {renderTitle()}
          </Link>
        ) : (
          renderTitle()
        )}
        {renderDistance("hidden sm:flex")}
      </div>
      {hours && (
        <div className="pb-2 sm:pb-4">
          <HoursStatus
            dayOfWeekTemplate={() => null}
            hours={hours}
            separatorTemplate={() => <span className="bullet" />}
          />
        </div>
      )}
      <div>{address.line1}</div>
      {renderDistance("sm:hidden")}
    </div>
  );
};

// Convert meters to miles or kilometers.
function getDistance(distance: number, useKilometers: boolean) {
  if (useKilometers) {
    return (distance / 1000).toFixed(2);
  }
  return (distance / 1609.344).toFixed(2);
}

export default LocatorCard;
