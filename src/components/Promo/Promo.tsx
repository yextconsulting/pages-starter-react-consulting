import React from "react";
import {
  Image as ImageType,
  CTA as CTAType
} from "@yext/types";
import { Image, Link } from '@yext/sites-react-components';
import appStoreIcon from "src/assets/images/appstore.svg";
import playStoreIcon from "src/assets/images/playstore.svg";

export const defaultFields = [
  'c_promo'
]

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
    <div className="Promo py-8 sm:py-16">
      <div className="container flex flex-col md:flex-row">
        {props.image && (
          <div className="w-full md:w-1/2">
            <Image imageField={props.image} />
          </div>
        )}

        <div className="w-full md:w-1/2 flex flex-col gap-8 mt-8 md:ml-16">
          <h2 className="Heading Heading--head">
            {props.title}
          </h2>

          {props.description && (
            <div>
              {props.description}
            </div>
          )}

          {props.cta && (
            <Link className="Button Button--primary inline-flex self-start" cta={props.cta} />
          )}

          {(props.appStoreLink || props.googlePlayLink) && (
            <div className="flex gap-4">
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