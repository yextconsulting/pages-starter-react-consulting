import { FeaturedCardContent, FeaturedCardComponent } from "src/models/cardComponent";
import { ProductProfile } from "src/types/entities";
import ProductCard from "src/components/cards/ProductCard"
import Featured from "src/components/Featured/Featured"

interface ProductProps {
  title: string;
  items: ProductProfile[];
  FeaturedCardComponent: FeaturedCardComponent;
}

const Products = (props: ProductProps) => {
  const { title, items, FeaturedCardComponent = ProductCard } = props;
  return (
    <Featured title={title} items={items} FeaturedCardComponent={FeaturedCardComponent}/>
  )
}

export default Products;
