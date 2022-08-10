import React from "react";
import "src/styles/FeaturedProduct.css";
import { Image, Link } from "@yext/sites-react-components";
import { CTA, Image as ImageType } from "@yext/types";

interface FeaturedProductProps {
  title: string;
  products: any;
}

const FeaturedProduct = (props: FeaturedProductProps) => {
  const { title, products } = props;
  return (
    <div className="FeaturedProduct">
      <div className="FeaturedProduct-container centered-container">
        <div className="FeaturedProduct-heading m-4 Heading Heading--head">
          {title}
        </div>
        <div className="flex FeaturedProduct-content">
          {products.map((item: any) => (
              <ul key={item.title}>
                <div className="flex FeaturedProduct-card">
                  <div className="flex FeaturedProduct-imageWrapper">
                    {item.primaryPhoto && (<Image className="FeaturedProduct-image" imageField={item.primaryPhoto?.image}/>)}
                  </div>
                  <div className="mx-8 mt-8 FeaturedProduct-title">
                    {item.name}
                  </div>
                  <div className="mx-8 mt-4 mb-8 FeaturedProduct-description">
                    {item.richTextDescription}
                  </div>
                  <div className="mx-4 FeaturedProduct-ctaWrapper">
                    {item.c_primaryCTA && (<Link className="m-4 Button Button--secondary" cta={item.c_primaryCTA} />)}
                  </div>
                </div>
              </ul>
            ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProduct;
