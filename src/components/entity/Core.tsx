import { ReactNode } from "react";
import {
  Link,
  LocationMap,
  GoogleMaps,
  HoursTable,
} from "@yext/pages-components";
import type { LocationProfile } from "src/types/entities";
import { useBreakpoint } from "src/common/useBreakpoints";
import { LazyLoadWrapper } from "src/components/common/LazyLoadWrapper";
import { getMapKey } from "src/common/getMapKey";
import { useTemplateData } from "src/common/useTemplateData";
import ErrorBoundaryWithAnalytics from "../common/ErrorBoundaryWithAnalytics";

import RopeContainer from "../common/RopeContainer";

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
  return (
    <div
      className={`w-full mx-auto flex-1 flex flex-col text-brand-primary font-gotham font-base font-[500]`}
    >
      {props.children}
    </div>
  );
};

const CoreHeading = (props: { children: ReactNode }) => {
  return (
    <h2 className="font-legend text-brand-primary text-2xl lg:text-[35px] lg:leading-[52px]">
      {props.children}
    </h2>
  );
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
    <div className="bg-brand-white mx-auto">
      <div className="container mx-auto flex flex-col gap-[32px] mb-[64px]">
        <div className="flex flex-col lg:flex-row gap-[16px]">
          {profile.t_mainPhone && (
            <RopeContainer isPadded={true}>
              <CoreSection>
                <div className="flex flex-col gap-[24px]">
                  <CoreHeading>Information</CoreHeading>
                  <Link
                    href={profile.t_mainPhone.href}
                    className="link-underline font-[500] font-gotham text-lg leading-[24px]"
                  >
                    {profile.t_mainPhone.label}
                  </Link>
                  <div className="flex flex-col">
                    <div className="font-[500] font-gotham text-lg leading-[29px]">
                      {profile.address.line1}
                    </div>
                    <div className="font-[500] font-gotham text-lg leading-[29px]">
                      <span>{profile.address.city},</span>{" "}
                      {profile.address.region}
                    </div>
                  </div>
                  <Link
                    href={"/"}
                    className="underline underline-offset-0 decoration-0 font-[500] font-gotham text-base"
                  >
                    Get Directions
                  </Link>
                </div>
              </CoreSection>
            </RopeContainer>
          )}
          {(profile.hours || profile.additionalHoursText) && (
            <RopeContainer isPadded={true}>
              <CoreSection>
                <div className="flex flex-col gap-[16px]">
                  <CoreHeading>Hours</CoreHeading>
                  {profile.hours && (
                    <HoursTable hours={profile.hours} startOfWeek="monday" />
                  )}
                  {profile.additionalHoursText && (
                    <div className="mt-4 font-gotham text-sm font-[500]">
                      {profile.additionalHoursText}
                    </div>
                  )}
                </div>
              </CoreSection>
            </RopeContainer>
          )}
          {(profile.driveThroughHours || profile.additionalHoursText) && (
            <RopeContainer isPadded={true}>
              <CoreSection>
                <div className="flex-col gap-[16px]">
                  <CoreHeading>Drive-Thru Hours</CoreHeading>
                  {profile.driveThroughHours && (
                    <HoursTable
                      hours={profile.driveThroughHours}
                      startOfWeek="monday"
                    />
                  )}
                  {profile.additionalHoursText && (
                    <div className="mt-4 font-gotham text-sm font-[500]">
                      {profile.additionalHoursText}
                    </div>
                  )}
                </div>
              </CoreSection>
            </RopeContainer>
          )}
        </div>
        <div className="flex flex-row gap-[32px]">
          {isDesktopBreakpoint && profile.yextDisplayCoordinate && (
            <div className="w-1/2">
              <RopeContainer>
                <LazyLoadWrapper>
                  <LocationMap
                    className="h-[292px]"
                    coordinate={profile.yextDisplayCoordinate}
                    provider={GoogleMaps}
                    {...mapKey}
                  >
                    {mappinSVG}
                  </LocationMap>
                </LazyLoadWrapper>
              </RopeContainer>
            </div>
          )}
          {
            // placeholder for location image
            <div className="w-full lg:w-1/2">
              <RopeContainer>
                <LazyLoadWrapper>
                  <div className="bg-brand-gray-200 h-[146px] lg:h-[292px]" />
                </LazyLoadWrapper>
              </RopeContainer>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default Core;
