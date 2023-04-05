import { ProductProfile } from "src/types/entities";
import Featured from "src/components/entity/Featured";
import ProductCard from "src/components/cards/ProductCard";

interface ProductProps {
  title: string;
  items: ProductProfile[];
}

const Products = (props: ProductProps) => {
  const { title, items } = props;
  return (
    <Featured
      title={title}
      items={items}
      CardComponent={ProductCard}
      itemsToShow={3}
    />
  );
};

export default Products;
