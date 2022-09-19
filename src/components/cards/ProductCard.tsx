
import React from "react";
import { Address, HoursStatus } from "@yext/sites-react-components";
import { Image } from "@yext/sites-react-components";
import { Link } from "@yext/pages/components";
import { ProductProfile } from "src/types/entities";
import { FeaturedCardProps } from "src/models/cardComponent";

export default function ProductCard(props: FeaturedCardProps): JSX.Element {
  const { content } = props;

  return (
      <>
        <div className="flex justify-center">
          {content.profile.primaryPhoto && (<Image className="FeaturedProduct-image" imageField={content.profile.primaryPhoto.image}/>)}
        </div>
        <div className="mx-8 mt-8 FeaturedProduct-title">
          {content.profile.name}
        </div>
        <div className="mx-8 mt-4 mb-8 FeaturedProduct-description">
          {content.profile.richTextDescription}
        </div>
        <div className="mx-4 FeaturedProduct-ctaWrapper">
          {content.profile.c_primaryCTA && (<Link className="m-4 Button Button--secondary" cta={content.profile.c_primaryCTA} />)}
        </div>
      </>
  )
}