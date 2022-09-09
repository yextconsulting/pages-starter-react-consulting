
import React from "react";
import { Address, HoursStatus } from "@yext/sites-react-components";
import { Image } from "@yext/sites-react-components";
import { Link } from "@yext/pages/components";
import { ProductProfile } from "src/types/entities";

interface ProductCardProps {
  profile: ProductProfile
}

export default function ProductCard(props: ProductCardProps): JSX.Element {
  const { profile } = props;

  return (
      <>
        <div className="flex justify-center">
          {profile.primaryPhoto && (<Image className="FeaturedProduct-image" imageField={profile.primaryPhoto.image}/>)}
        </div>
        <div className="mx-8 mt-8 FeaturedProduct-title">
          {profile.name}
        </div>
        <div className="mx-8 mt-4 mb-8 FeaturedProduct-description">
          {profile.richTextDescription}
        </div>
        <div className="mx-4 FeaturedProduct-ctaWrapper">
          {profile.c_primaryCTA && (<Link className="m-4 Button Button--secondary" cta={profile.c_primaryCTA} />)}
        </div>
      </>
  )
}