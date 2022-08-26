import React from "react";
import { Image } from "@yext/pages/components";
import { Image as ImageType } from  "@yext/types";

type BannerProps = {
  image?: ImageType;
  text: string;
};

const Banner = (props: BannerProps) => {
  return (
    <>
    <div className="Banner bg-brand-secondary text-white py-4">
      <div className="container flex">
          {props.image && <div className="Banner-logoContainer flex">
              <Image className="Banner-image" imageField={props.image} />
          </div>}
          <div className="flex">
            {props.text}
          </div>
        </div>
    </div>
    </>
  );
};

export default Banner;
