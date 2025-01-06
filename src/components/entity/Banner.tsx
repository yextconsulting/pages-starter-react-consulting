import { useState } from "react";
import { Image, type ImageType } from "@yext/pages-components";
import { FaTimes } from "react-icons/fa";
import { useTemplateData } from "src/common/useTemplateData";
import { LocationProfile } from "src/types/entities";
import ErrorBoundaryWithAnalytics from "../common/ErrorBoundaryWithAnalytics";

type BannerProps = {
  hasCloseBtn?: boolean;
};

const Banner = (props: BannerProps) => {
  const templateData = useTemplateData();
  const profile = templateData.document as LocationProfile;
  const banner = profile.c_bannerSection;

  if (banner?.text && banner?.image) {
    return (
      <ErrorBoundaryWithAnalytics name="banner">
        <BannerLayout
          text={banner.text}
          image={banner.image}
          hasCloseBtn={props.hasCloseBtn}
        />
      </ErrorBoundaryWithAnalytics>
    );
  }

  return null;
};

type BannerLayoutProps = BannerProps & {
  image?: ImageType;
  text: string;
};

const BannerLayout = (props: BannerLayoutProps) => {
  const [showBanner, setShowBanner] = useState(true);

  if (!showBanner) {
    return null;
  }

  return (
    <div className="bg-brand-primary text-white py-4">
      <div className="container flex items-center">
        {props.image && (
          <div className="flex mr-4 w-4">
            <Image image={props.image} className="rounded-full" />
          </div>
        )}
        <div className="flex flex-grow mr-4">{props.text}</div>

        {props.hasCloseBtn && (
          <button onClick={() => setShowBanner(false)}>
            <FaTimes className="w-4 h-4" />
            <span className="sr-only">Hide banner</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Banner;
