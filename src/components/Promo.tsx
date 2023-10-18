import type { Image as ImageType, CTA as CTAType } from "@yext/types";
import { Link, Image } from "@yext/sites-components";
import appStoreIcon from "src/assets/images/appstore.svg";
import playStoreIcon from "src/assets/images/playstore.svg";

type PromoProps = {
  image?: ImageType;
  title: string;
  description?: string;
  cta?: CTAType;
  appStoreUrl?: string;
  googlePlayUrl?: string;
};

const Promo = (props: PromoProps) => {
  return (
    <div className="Promo py-8 sm:py-16">
      <div className="container flex flex-col md:flex-row">
        {props.image && (
          <div className="w-full md:w-1/2">
            <Image image={props.image} />
          </div>
        )}

        <div className="w-full md:w-1/2 flex flex-col gap-8 mt-8 md:ml-16">
          <h2 className="Heading Heading--head">{props.title}</h2>

          {props.description && <div>{props.description}</div>}

          {props.cta && (
            <Link
              className="Button Button--primary inline-flex self-start"
              cta={props.cta}
            />
          )}

          {(props.appStoreUrl || props.googlePlayUrl) && (
            <div className="flex gap-4">
              {props.appStoreUrl && (
                <Link href={props.appStoreUrl}>
                  <img src={appStoreIcon} alt="Download on the App Store" />
                </Link>
              )}
              {props.googlePlayUrl && (
                <Link href={props.googlePlayUrl}>
                  <img src={playStoreIcon} alt="Download on the Play Store" />
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Promo;
