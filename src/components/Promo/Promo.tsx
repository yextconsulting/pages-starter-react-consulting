import React from "react";
import {
  Image as ImageType,
  CTA as CTAType
} from "@yext/types";
import { Image, Link } from '@yext/sites-react-components';
import "./Promo.css";
import appStoreIcon from "src/assets/images/appstore.svg";
import playStoreIcon from "src/assets/images/playstore.svg";

type PromoProps = {
  image?: ImageType,
  title: string,
  description?: string,
  cta?: CTAType,
  appStoreLink?: string,
  googlePlayLink?: string,
};

const Promo = (props: PromoProps) => {
  return (
    <div className="Promo">
      <div className="container flex flex-col md:flex-row">
        {props.image && (
          <div className="w-full md:w-1/2">
            <Image className="Promo-image" imageField={props.image} />
          </div>
        )}

        <div className="Promo-content w-full md:w-1/2 space-y-8">
          <h2 className="Promo-title Heading Heading--head">
            {props.title}
          </h2>

          {props.description && (
            <div className="Promo-description">
              {props.description}
            </div>
          )}

          {props.cta && (
            <Link className="Promo-cta inline-flex Button Button--primary" cta={props.cta} />
          )}

          {(props.appStoreLink || props.googlePlayLink) && (
            <div className="Promo-apps flex space-x-4">
              {props.appStoreLink && (
                <Link href={props.appStoreLink}>
                  <img src={appStoreIcon} alt="Download on the App Store"/>
                </Link>
              )}
              {props.googlePlayLink && (
                <Link href={props.googlePlayLink}>
                  <img src={playStoreIcon} alt="Download on the Play Store"/>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
};

export {
  Promo,
};