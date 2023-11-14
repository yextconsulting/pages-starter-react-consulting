import { ReactNode } from "react";
import { HoursTable } from "@yext/sites-react-components";
import {
  Link,
  Address,
  getDirections,
  LocationMap,
  GoogleMaps,
} from "@yext/sites-components";
import type { LocationProfile } from "src/types/entities";
import { FaPhone, FaEnvelope } from "react-icons/fa";
import { useBreakpoint } from "src/common/useBreakpoints";
import { LazyLoadWrapper } from "src/components/common/LazyLoadWrapper";
import { useMapKey } from "src/common/useMapKey";

type CoreProps = {
  profile: LocationProfile;
};

const CoreSection = (props: { children: ReactNode }) => {
  return <div className="w-full sm:w-1/2 lg:w-1/3 mb-8">{props.children}</div>;
};

const CoreHeading = (props: { children: ReactNode }) => {
  return <h2 className="Heading Heading--sub mb-4">{props.children}</h2>;
};

const Core = (props: CoreProps) => {
  const mapKey = useMapKey();
  const isDesktopBreakpoint = useBreakpoint("sm");
  const { profile } = props;
  const mappinSVG = (
    <svg
      width="56"
      height="58"
      viewBox="0 0 56 58"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M28.0951 1C33.1149 1 37.6595 3.03469 40.9491 6.32432C44.2388 9.61396 46.2734 14.1586 46.2734 19.1784C46.2734 25.9554 40.1704 38.558 28.0941 57C16.019 38.5565 9.91669 25.955 9.91669 19.1784C9.91669 14.1586 11.9514 9.61396 15.241 6.32432C18.5307 3.03469 23.0752 1 28.0951 1Z"
        fill="#0F70F0"
        stroke="black"
        strokeOpacity="0.5"
      />
      <path
        d="M28.095 27.2577C32.5571 27.2577 36.1743 23.6405 36.1743 19.1784C36.1743 14.7163 32.5571 11.0991 28.095 11.0991C23.633 11.0991 20.0157 14.7163 20.0157 19.1784C20.0157 23.6405 23.633 27.2577 28.095 27.2577Z"
        fill="white"
      />
    </svg>
  );

  return (
    <div className="Core py-8 sm:py-16 bg-brand-gray-100">
      <div className="container">
        <div className="flex flex-row flex-wrap">
          <CoreSection>
            <CoreHeading>Information</CoreHeading>
            <Address address={profile.address} />
            <Link
              className="Link--primary Link--underline font-bold mt-2"
              href={`${getDirections(
                profile.address,
                profile.ref_listings,
                profile.googlePlaceId
              )}`}
            >
              Get Directions
            </Link>
            {/* TODO(GENERATOR): use Phone component */}
            {profile.mainPhone && (
              <div className="flex items-center mt-4">
                <FaPhone className="text-blue-500 mr-2" />
                <span className="mr-2 font-bold">Phone</span>
                <span>{profile.mainPhone}</span>
              </div>
            )}
            {profile.tollFreePhone && (
              <div className="flex items-center mt-4">
                <FaPhone className="text-blue-500 mr-2" />
                <span className="mr-2 font-bold">Toll-free</span>
                <span>{profile.tollFreePhone}</span>
              </div>
            )}
            {profile.emails && (
              <div className="flex items-center mt-4">
                <FaEnvelope className="text-blue-500 mr-2" />
                <Link
                  className="Link--primary Link--underline font-bold"
                  cta={{ link: profile.emails[0], linkType: "Email" }}
                />
              </div>
            )}
          </CoreSection>
          {(profile.hours || profile.additionalHoursText) && (
            <CoreSection>
              <CoreHeading>Hours</CoreHeading>
              {profile.hours && (
                <HoursTable hours={profile.hours} startOfWeek="Monday" />
              )}
              {profile.additionalHoursText && (
                <div className="mt-4">{profile.additionalHoursText}</div>
              )}
            </CoreSection>
          )}
          {profile.services && (
            <CoreSection>
              <CoreHeading>Services</CoreHeading>
              <ul className="list-inside">
                {profile.services.map((service) => (
                  <li className="mb-2" key={service}>
                    {service}
                  </li>
                ))}
              </ul>
            </CoreSection>
          )}
        </div>
        {isDesktopBreakpoint && profile.yextDisplayCoordinate && (
          <LazyLoadWrapper>
            <LocationMap
              className="h-[300px] mt-6"
              coordinate={profile.yextDisplayCoordinate}
              provider={GoogleMaps}
              {...mapKey}
            >
              {mappinSVG}
            </LocationMap>
          </LazyLoadWrapper>
        )}
      </div>
    </div>
  );
};

export default Core;
