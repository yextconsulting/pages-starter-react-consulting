import { ReactNode } from "react";
import {
  Link,
  Address,
  getDirections,
  LocationMap,
  GoogleMaps,
  HoursTable,
} from "@yext/pages-components";
import type { LocationProfile } from "src/types/entities";
import { FaPhone, FaEnvelope } from "react-icons/fa";
import { useBreakpoint } from "src/common/useBreakpoints";
import { LazyLoadWrapper } from "src/components/common/LazyLoadWrapper";
import { getMapKey } from "src/common/getMapKey";
import { useTemplateData } from "src/common/useTemplateData";
import ErrorBoundaryWithAnalytics from "../common/ErrorBoundaryWithAnalytics";

const Core = () => {
  const templateData = useTemplateData();
  const profile = templateData.document as LocationProfile;

  return (
    <ErrorBoundaryWithAnalytics name="core">
      <CoreLayout profile={profile} />
    </ErrorBoundaryWithAnalytics>
  );
};

type CoreLayoutProps = {
  profile: LocationProfile;
};

const CoreSection = (props: { children: ReactNode }) => {
  return <div className="w-full sm:w-1/2 lg:w-1/3 mb-8">{props.children}</div>;
};

const CoreHeading = (props: { children: ReactNode }) => {
  return <h2 className="heading heading-sub mb-4">{props.children}</h2>;
};

const CoreLayout = (props: CoreLayoutProps) => {
  const mapKey = getMapKey();
  const isDesktopBreakpoint = useBreakpoint("sm");
  const { profile } = props;
  const mappinSVG = (
    <svg
      width="56"
      height="58"
      viewBox="0 0 56 58"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-brand-primary"
    >
      <path
        d="M28.0951 1C33.1149 1 37.6595 3.03469 40.9491 6.32432C44.2388 9.61396 46.2734 14.1586 46.2734 19.1784C46.2734 25.9554 40.1704 38.558 28.0941 57C16.019 38.5565 9.91669 25.955 9.91669 19.1784C9.91669 14.1586 11.9514 9.61396 15.241 6.32432C18.5307 3.03469 23.0752 1 28.0951 1Z"
        fill="currentColor"
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
    <div className="py-8 sm:py-16 bg-brand-gray-100">
      <div className="container">
        <div className="flex flex-row flex-wrap">
          <CoreSection>
            <CoreHeading>Information</CoreHeading>
            <Address address={profile.address} />
            <Link
              className="link-primary link-underline font-bold mt-2"
              href={`${getDirections(
                profile.address,
                profile.ref_listings,
                profile.googlePlaceId
              )}`}
              eventName="getdirections"
            >
              Get Directions
            </Link>
            {profile.t_mainPhone && (
              <div className="flex items-center mt-4">
                <FaPhone className="text-brand-primary mr-2" />
                <span className="mr-2 font-bold">Phone</span>
                <Link
                  href={profile.t_mainPhone.href}
                  className="link-underline"
                >
                  {profile.t_mainPhone.label}
                </Link>
              </div>
            )}
            {profile.t_tollFreePhone && (
              <div className="flex items-center mt-4">
                <FaPhone className="text-brand-primary mr-2" />
                <span className="mr-2 font-bold">Toll-free</span>
                <Link
                  href={profile.t_tollFreePhone.href}
                  className="link-underline"
                >
                  {profile.t_tollFreePhone.label}
                </Link>
              </div>
            )}
            {profile.emails && (
              <div className="flex items-center mt-4">
                <FaEnvelope className="text-brand-primary mr-2" />
                <Link
                  className="link-primary link-underline font-bold"
                  cta={{ link: profile.emails[0], linkType: "Email" }}
                  eventName="email"
                >
                  {profile.emails[0]}
                </Link>
              </div>
            )}
          </CoreSection>
          {(profile.hours || profile.additionalHoursText) && (
            <CoreSection>
              <CoreHeading>Hours</CoreHeading>
              {profile.hours && (
                <HoursTable hours={profile.hours} startOfWeek="monday" />
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
