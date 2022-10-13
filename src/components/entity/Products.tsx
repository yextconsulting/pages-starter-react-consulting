import { Featured } from "src/components/entity/Featured";
import { ProductCard } from "src/components/cards/ProductCard";
import { ProductProfile } from "src/types/entities";

const defaultFields: string[] = [
  'c_featuredProductsSection.title',
  'c_featuredProductsSection.products.name',
  'c_featuredProductsSection.products.richTextDescription',
  'c_featuredProductsSection.products.primaryPhoto',
  'c_featuredProductsSection.products.c_primaryCTA'
];

interface ProductProps {
  title: string;
  items: ProductProfile[];
}

const Products = (props: ProductProps) => {
  const { title, items } = props;
  return (
    <Featured title={title} items={items} CardComponent={ProductCard} itemsToShow={3}/>
  )
}

export {
  Products,
  defaultFields
}
