import type { Image as ImageType, CTA as CTAType } from "@yext/types";
import { Link, Image } from "@yext/pages-components";
import appStoreIcon from "src/assets/images/appstore.svg";
import playStoreIcon from "src/assets/images/playstore.svg";
import { useTemplateData } from "src/common/useTemplateData";
import { LocationProfile } from "src/types/entities";
import ErrorBoundaryWithAnalytics from "../common/ErrorBoundaryWithAnalytics";

const Promo = () => {
  const templateData = useTemplateData();
  const profile = templateData.document as LocationProfile;
  const promo = profile.c_promoSection;

  if (promo?.title && promo?.image) {
    return (
      <ErrorBoundaryWithAnalytics name="promo">
        <PromoLayout
          title={promo.title}
          description={promo.description}
          image={promo.image}
          cta={promo.cta}
          googlePlayUrl={promo.googlePlayUrl}
          appStoreUrl={promo.appStoreUrl}
        />
      </ErrorBoundaryWithAnalytics>
    );
  }

  return null;
};

type PromoLayoutProps = {
  image?: ImageType;
  title: string;
  description?: string;
  cta?: CTAType;
  appStoreUrl?: string;
  googlePlayUrl?: string;
};

const PromoLayout = (props: PromoLayoutProps) => {
  return (
    <div className="py-8 sm:py-16">
      <div className="container flex flex-col md:flex-row">
        {props.image && (
          <div className="w-full md:w-1/2">
            <Image image={props.image} />
          </div>
        )}

        <div className="w-full md:w-1/2 flex flex-col gap-8 mt-8 md:ml-16">
          <h2 className="heading heading-head">{props.title}</h2>

          {props.description && <div>{props.description}</div>}

          {props.cta && (
            <Link
              className="button button-primary inline-flex self-start"
              cta={props.cta}
            />
          )}

          {(props.appStoreUrl || props.googlePlayUrl) && (
            <div className="flex gap-4">
              {props.appStoreUrl && (
                <Link href={props.appStoreUrl} eventName="applestore">
                  <img src={appStoreIcon} alt="Download on the App Store" />
                </Link>
              )}
              {props.googlePlayUrl && (
                <Link href={props.googlePlayUrl} eventName="googleplaystore">
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
