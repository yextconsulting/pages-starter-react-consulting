import type { CardProps } from "@yext/search-ui-react";
import { useAnalytics } from "@yext/search-ui-react";
import { useSearchState } from "@yext/search-headless-react";
import { HoursStatus } from "@yext/pages-components";
import classNames from "classnames";
import { MaybeLink } from "src/components/common/MaybeLink";
import { EXPERIENCE_KEY } from "src/config";
import { LocationProfile } from "src/types/entities";

export interface LocatorCardProps {
  useKilometers?: boolean;
}

const LocatorCard = (props: LocatorCardProps & CardProps<LocationProfile>) => {
  const { result } = props;
  const { rawData } = result;
  const { address, hours, slug, timezone } = rawData;

  const queryId = useSearchState((state) => state.query.queryId);
  const verticalKey = useSearchState((state) => state.vertical?.verticalKey);
  const analytics = useAnalytics();
  const searchId = useSearchState((state) => state.meta.uuid);

  return (
    <div>
      <div className="flex justify-between">
        <MaybeLink
          className="link-primary hover:underline"
          href={slug ? `/${slug}` : ""}
          onClick={() => {
            analytics?.report({
              experienceKey: EXPERIENCE_KEY,
              action: "TITLE",
              entity: result.id,
              queryId,
              verticalKey,
              searchId,
            });
          }}
        >
          <h3 className="heading heading-sub pb-2 sm:pb-4">
            {address.line1 ? address.line1 : address.city}
          </h3>
        </MaybeLink>
        <TeaserDistance {...props} className="hidden sm:flex" />
      </div>
      {hours && timezone && (
        <div className="pb-2 sm:pb-4 h-6">
          <HoursStatus
            className="h-full"
            dayOfWeekTemplate={() => null}
            hours={hours}
            separatorTemplate={() => <span className="bullet" />}
            timezone={timezone}
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

function getDistance(distance: number, useKilometers: boolean) {
  if (useKilometers) {
    return (distance / 1000).toFixed(2);
  }
  return (distance / 1609.344).toFixed(2);
}

export default LocatorCard;
