import React from "react";
import { Image } from "@yext/sites-react-components";
import { Image as ImageType } from  "@yext/types";
import "src/styles/Banner.css";

type BannerProps = {
  image?: ImageType;
  text?: string;
};

const Banner = (props: BannerProps) => {
  return (
    <>
    <div className="Banner">
      <div className="Banner-container container flex">
          {props.image && <div className="Banner-logoContainer flex">
              <Image className="Banner-image" imageField={props.image} />
          </div>}
          <div className="Header-content flex">
            {props.text}
          </div>
        </div>
    </div>
    </>
  );
};

export default Banner;
