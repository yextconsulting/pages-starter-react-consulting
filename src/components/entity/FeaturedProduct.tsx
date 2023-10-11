import { Image, Link } from "@yext/sites-components";
import type { ProductProfile } from "src/types/entities";

const defaultFields: string[] = [
  "c_featuredProductsSection.title",
  "c_featuredProductsSection.products.name",
  "c_featuredProductsSection.products.richTextDescription",
  "c_featuredProductsSection.products.primaryPhoto",
  "c_featuredProductsSection.products.c_primaryCTA",
];

interface FeaturedProductProps {
  title: string;
  products: ProductProfile[];
}

const FeaturedProduct = (props: FeaturedProductProps) => {
  const { title, products } = props;
  if (!products.length) return null;

  return (
    <div className="FeaturedProduct py-8 sm:py-16 bg-brand-gray-100">
      <div className="container">
        <div className="pb-2 m-4 Heading Heading--head">{title}</div>
        <ul className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {products?.map((item, i) => (
            <div key={i} className="bg-white">
              {item.primaryPhoto && (
                <div className="flex justify-center h-[187px] mb-8">
                  <Image layout="fill" image={item.primaryPhoto.image} />
                </div>
              )}
              <div className="Heading Heading--sub mx-8">{item.name}</div>
              {item.richTextDescription && (
                <div className="mx-8 mt-4">{item.richTextDescription}</div>
              )}
              {item.c_primaryCTA && (
                <div className="flex mx-8 mt-8 mb-4">
                  <Link
                    className="self-start Button Button--secondary"
                    cta={item.c_primaryCTA}
                  />
                </div>
              )}
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FeaturedProduct;
