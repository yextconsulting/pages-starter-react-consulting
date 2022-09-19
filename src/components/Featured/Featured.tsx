import React from "react";
import { ProductProfile } from "src/types/entities";
import { FeaturedCardContent, FeaturedCardComponent } from "src/models/cardComponent";
import ProductCard from "src/components/cards/ProductCard"
import "src/styles/FeaturedProduct.css";

interface FeaturedProps {
  title: string;
  items: ProductProfile[];
  FeaturedCardComponent: FeaturedCardComponent;
}

const Featured = (props: FeaturedProps) => {
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
             renderCard(FeaturedCardComponent, {profile: item}, i)
          ))}
        </ul>
      </div>
    </div>
  );
};

function renderCard(
  FeaturedCardComponent: FeaturedCardComponent,
  childContent: FeaturedCardContent,
  index: number
): JSX.Element {
  return (
    <li className="FeaturedProduct-card mb-8" key={index}>
      <FeaturedCardComponent content={childContent} />
    </li>
  )
}

export default Featured;
