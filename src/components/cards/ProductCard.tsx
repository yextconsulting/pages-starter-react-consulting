
import React from "react";
import { Image } from "@yext/sites-react-components";
import { Link } from "@yext/pages/components";
import { ProductProfile } from "src/types/entities";
import { FeaturedCardComponent } from "src/models/cardComponent";

export const ProductCard: FeaturedCardComponent<ProductProfile> = function productCard(props): JSX.Element {
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