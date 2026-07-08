import {
  Link,
  Image,
  HoursStatus,
  type AddressType,
  type HoursType,
  type CTA,
  type ImageType,
} from "@yext/pages-components";
import { useTemplateData } from "src/common/useTemplateData";
import type { LocationProfile } from "src/types/entities";
import ErrorBoundaryWithAnalytics from "../common/ErrorBoundaryWithAnalytics";

import waveImg from "src/assets/images/wave.png";

import CTAButton from "../common/CTAButton";

const Hero = () => {
  const templateData = useTemplateData();
  const profile = templateData.document as LocationProfile;
  const hero = profile.c_heroSection;

  console.log("cta1: ", hero?.cta1);
  console.log("cta2: ", hero?.cta2);
  console.log("banner section: ", profile.c_bannerSection);

  return (
    <ErrorBoundaryWithAnalytics name="hero">
      <HeroLayout
        name={profile.name}
        cta1={hero?.cta1}
        cta2={hero?.cta2}
        address={profile.address}
        background={hero?.background}
        hours={profile.hours}
        timezone={profile.timezone}
        numReviews={21}
        rating={4.5}
      />
    </ErrorBoundaryWithAnalytics>
  );
};

type HeroLayoutProps = {
  name: string;
  address: AddressType;
  background?: ImageType;
  cta1?: CTA;
  cta2?: CTA;
  hours?: HoursType;
  timezone?: string;
  numReviews?: number;
  rating?: number;
};

const HeroLayout = (props: HeroLayoutProps) => {
  return (
    <div className="Hero pt-[24px] pb-[40px] px-[16px] lg:py-[64px]">
      <div className="container flex flex-col">
        <div className="w-full lg:w-1/2 mb-6 flex flex-col gap-[24px] mx-auto">
          <div>
            <h1 className="sm:mb-0 text-center text-brand-primary text-3xl font-legend">
              {props.name}
            </h1>
            <div className="text-center text-brand-primary text-5xl font-oldStandard">
              {props.address.city}
            </div>
          </div>
          <img src={waveImg} alt="" className="w-[160px] h-[10px] mx-auto" />
          {props.hours && props.timezone && (
            <div className="h-6 text-brand-primary font-lg font-legend mx-auto flex flex-row gap-[8px]">
              <div
                className={`my-auto w-[8px] h-[8px] rounded-full bg-[#279700]`}
              ></div>
              <HoursStatus
                hours={props.hours}
                timezone={props.timezone}
                separatorTemplate={() => <span className="bullet" />}
                dayOfWeekTemplate={() => null}
                className="h-full"
              />
            </div>
          )}
          {/* TODO(aganesh) : use Reviews component when available */}
          {/* {props.rating && (
            <div className="mb-6 lg:mb-8">
              <span> {props.rating} out of 5 </span>
              <span>({props.numReviews} reviews)</span>
            </div>
          )} */}
          {(props.cta1 || props.cta2) && (
            <div className="flex flex-col lg:flex-row mb-4 gap-4">
              {props.cta1 && (
                <Link className="button button-primary" cta={props.cta1} />
              )}
              {props.cta2 && (
                <Link className="button button-secondary" cta={props.cta2} />
              )}
            </div>
          )}
        </div>
        <div className="flex flex-col lg:flex-row mx-auto gap-[16px]">
          <CTAButton
            text={"Order Online for Pickup"}
            link={""}
            isPrimary={true}
          />
          <CTAButton text={"Order with Doordash"} link={""} isPrimary={false} />
          <CTAButton
            text={"Order with Postmates"}
            link={""}
            isPrimary={false}
          />
        </div>
        {props.background && (
          <div className="w-full lg:w-1/2">
            <Image
              className="w-full h-full object-cover"
              image={props.background}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
