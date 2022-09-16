import React from "react";
import { Image } from "@yext/pages/components";
import type { Image as ImageType } from  "@yext/types";

const defaultFields: string[] = [
  'c_bannerSection',
];

type BannerProps = {
  image?: ImageType;
  text: string;
};

const Banner = (props: BannerProps) => {
  return (
    <div className="Banner bg-brand-secondary text-white py-4">
      <div className="container flex items-center">
        {props.image && (
          <div className="flex mr-4">
            <Image image={props.image} />
          </div>
        )}
        <div className="flex">
          {props.text}
        </div>
      </div>
    </div>
  );
};

export {
  Banner,
  defaultFields,
};
