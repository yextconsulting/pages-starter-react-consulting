import React from "react";
import { ProductProfile } from "src/types/entities";
import { FeaturedCardContent, FeaturedCardComponent } from "src/models/cardComponent";
import ProductCard from "src/components/cards/ProductCard"
import "src/styles/FeaturedProduct.css";

interface FeaturedProps<ProfileType> {
  title: string;
  items: ProfileType[];
  FeaturedCardComponent: FeaturedCardComponent<ProfileType>;
}

const Featured = <ProfileType,>(props: FeaturedProps<ProfileType>) => {
  const { title, items, FeaturedCardComponent = ProductCard } = props;
  if (!items.length) return null;

  return (
    <div className="FeaturedProduct">
      <div className="container">
        <div className="FeaturedProduct-heading pb-2 m-4 Heading Heading--head">
          {title}
        </div>
        <ul className="flex FeaturedProduct-content gap-6">
          {items?.map((item, i) => (
             renderCard<ProfileType>(FeaturedCardComponent, {profile: item}, i)
          ))}
        </ul>
      </div>
    </div>
  );
};

function renderCard<T>(
  FeaturedCardComponent: FeaturedCardComponent<T>,
  childContent: FeaturedCardContent<T>,
  index: number
): JSX.Element {
  return (
    <li className="FeaturedProduct-card mb-8" key={index}>
      <FeaturedCardComponent content={childContent} />
    </li>
  )
}

export default Featured;
