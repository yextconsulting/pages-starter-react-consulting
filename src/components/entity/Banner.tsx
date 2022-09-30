import React, { useState } from "react";
import { Image } from "@yext/pages/components";
import type { Image as ImageType } from  "@yext/types";
import { FaTimes } from "react-icons/fa";

const defaultFields: string[] = [
  'c_bannerSection',
];

type BannerProps = {
  image?: ImageType;
  text: string;
  hasCloseBtn?: boolean;
};

const Banner = (props: BannerProps) => {
  const [ showBanner, setShowBanner ] = useState(true);

  if (!showBanner) { 
    return null;
  }

  return (
    <div className="Banner bg-brand-secondary text-white py-4">
      <div className="container flex items-center">
        {props.image && (
          <div className="flex mr-4">
            <Image image={props.image} />
          </div>
        )}
        <div className="flex flex-grow mr-4">
          {props.text}
        </div>

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

export {
  Banner,
  defaultFields,
};
