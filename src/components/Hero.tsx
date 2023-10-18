import { HoursStatus } from "@yext/sites-react-components";
import { Link, Image } from "@yext/sites-components";
import type { Address, Hours, CTA, Image as ImageType } from "@yext/types";

type HeroProps = {
  name: string;
  address: Address;
  background?: ImageType;
  cta1?: CTA;
  cta2?: CTA;
  hours?: Hours;
  numReviews?: number;
  rating?: number;
};

const Hero = (props: HeroProps) => {
  return (
    <div className="Hero py-8 sm:py-16">
      <div className="container flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 lg:mt-8 mb-6 lg:mb-0 lg:mr-8">
          <h1 className="Heading Heading--sub mb-4 sm:mb-0">{props.name}</h1>
          <div className="Heading Heading--lead mb-4">
            {props.address.line1}
          </div>
          {props.hours && (
            <div className="mb-4">
              <HoursStatus
                hours={props.hours}
                separatorTemplate={() => <span className="bullet" />}
                dayOfWeekTemplate={() => null}
              />
            </div>
          )}
          {/* TODO(aganesh) : use Reviews component when available */}
          {props.rating && (
            <div className="mb-6 lg:mb-8">
              <span> {props.rating} out of 5 </span>
              <span>({props.numReviews} reviews)</span>
            </div>
          )}
          {(props.cta1 || props.cta2) && (
            <div className="flex flex-col lg:flex-row mb-4 gap-4">
              {props.cta1 && (
                <Link className="Button Button--primary" cta={props.cta1} />
              )}
              {props.cta2 && (
                <Link className="Button Button--secondary" cta={props.cta2} />
              )}
            </div>
          )}
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
