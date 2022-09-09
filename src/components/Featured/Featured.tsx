import React from "react";
import { ProductProfile } from "src/types/entities";
import ProductCard from "src/components/cards/ProductCard"
import "src/styles/FeaturedProduct.css";

interface FeaturedProps {
  title: string;
  items: ProductProfile[];
}

const Featured = (props: FeaturedProps) => {
  const { title, items } = props;
  if (!items.length) return null;

  return (
    <div className="FeaturedProduct">
      <div className="container">
        <div className="FeaturedProduct-heading pb-2 m-4 Heading Heading--head">
          {title}
        </div>
        <ul className="flex FeaturedProduct-content gap-6">
          {items?.map((item, i) => (
             renderCard(ProductCard, item, i)
          ))}
        </ul>
      </div>
    </div>
  );
};

function renderCard(
  CardComponent: typeof ProductCard,
  childContent: ProductProfile,
  index: number
): JSX.Element {
  return (
    <li className="FeaturedProduct-card mb-8" key={index}>
      <CardComponent profile={childContent} />
    </li>
  )
}

export default Featured;
