import React from "react";
import {
  Image as ImageType,
  CTA as CTAType
} from "@yext/types";
import { Image, Link } from '@yext/pages/components';

type AboutProps = {
  image?: ImageType,
  title: string,
  description?: string,
  cta?: CTAType,
};

const About = (props: AboutProps) => {
  return (
    <div className="About py-8 sm:py-16">
      <div className="About-container container flex flex-col md:flex-row gap-8 md:gap-16">
        {props.image && (
          <div className="About-imageWrapper w-full md:w-1/2">
            <Image className="About-image" image={props.image} />
          </div>
        )}

        <div className="About-content w-full md:w-1/2 flex flex-col gap-8">
          <h2 className="About-title Heading Heading--head">
            {props.title}
          </h2>

          {props.description && (
            <div className="About-description">
              {props.description}
            </div>
          )}

          {props.cta && (
            <Link className="About-cta inline-flex self-start Button Button--secondary" cta={props.cta} />
          )}
        </div>
      </div>
    </div>
  )
};

export {
  About,
};