import { ProductProfile } from "src/types/entities";
import Featured from "src/components/Featured";
import ProductCard from "src/components/ProductCard";

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
