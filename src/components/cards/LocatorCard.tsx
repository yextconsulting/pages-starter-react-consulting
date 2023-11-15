import type { CardProps } from "@yext/search-ui-react";
import { HoursStatus } from "@yext/sites-react-components";
import classNames from "classnames";
import { LocationProfile } from "src/types/entities";
import { useTemplateData } from "src/common/useTemplateData";
import { MaybeLink } from "src/components/common/MaybeLink";

export interface LocatorCardProps {
  useKilometers?: boolean;
}

const LocatorCard = (props: LocatorCardProps & CardProps<LocationProfile>) => {
  const { result } = props;
  const { rawData } = result;
  const { address, hours, slug } = rawData;
  const { relativePrefixToRoot } = useTemplateData();

  return (
    <div className="LocatorCard">
      <div className="flex justify-between">
        <MaybeLink
          className="Link--underlineInverse text-brand-primary"
          href={slug ? relativePrefixToRoot + slug : ""}
        >
          <h3 className="Heading Heading--sub pb-2 sm:pb-4">
            {address.line1 ? address.line1 : address.city}
          </h3>
        </MaybeLink>
        <TeaserDistance {...props} className="hidden sm:flex" />
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
      <TeaserDistance {...props} className="sm:hidden" />
    </div>
  );
};

const TeaserDistance = (
  props: LocatorCardProps & CardProps<LocationProfile> & { className?: string }
) => {
  const { className, result, useKilometers = false } = props;
  const { distanceFromFilter } = result;

  if (!distanceFromFilter) {
    return null;
  }

  return (
    <div className={classNames("whitespace-nowrap pt-2 sm:pt-0", className)}>
      {`${getDistance(distanceFromFilter, useKilometers)} ${
        useKilometers ? "km" : "mi"
      }`}
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
