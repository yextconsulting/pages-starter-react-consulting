import { useState } from "react";
import { Image } from "@yext/pages/components";
import type { Image as ImageType } from "@yext/types";
import { FaTimes } from "react-icons/fa";
import { useTranslations } from "src/common/useTranslations";

type BannerProps = {
  image?: ImageType;
  text: string;
  hasCloseBtn?: boolean;
};

const Banner = (props: BannerProps) => {
  const [showBanner, setShowBanner] = useState(true);
  const translate = useTranslations();

  if (!showBanner) {
    return null;
  }

  return (
    <div className="Banner bg-brand-primary text-white py-4">
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
            <span className="sr-only">{translate("Hide banner")}</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Banner;
